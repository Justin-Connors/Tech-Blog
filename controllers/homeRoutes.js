const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all users with their associated blog posts
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      include: [
        {
          model: BlogPost,
          attributes: ['title', 'author', 'body'],
        },
      ],
    });

    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users);
    res.render('homepage', {
      username: req.session.username,
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
