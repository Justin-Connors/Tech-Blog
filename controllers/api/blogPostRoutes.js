const express = require('express');
const router = express.Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to handle the submission of the new blog post form
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, author, body } = req.body;
    const newPost = await BlogPost.create({
      title,
      author,
      body,
      user_id: req.session.user_id
    });
    const post = await BlogPost.findByPk(newPost.id);
    return res.status(200).json({post});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


//create the blog post ->
// check #14