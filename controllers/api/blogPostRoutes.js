const express = require('express');
const router = express.Router();
const { BlogPost } = require('../../models');

// Route to handle the submission of the new blog post form
router.post('/', async (req, res) => {
  try {
    const { title, author, body } = req.body;
    const newPost = await BlogPost.create({
      title,
      author,
      body
    });
    const post = await BlogPost.findByPk(newPost.id);
    res.render('blogPost', { post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
