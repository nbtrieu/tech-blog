const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

// GET all posts on homepage
router.get('/', async (req, res) => {
  try {
    // GET all posts data and JOIN with user data
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });

    // Serialize data for handlebars template to read (array of serialized project objects)
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into handlebars template
    res.render('all-posts', { posts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

module.exports = router;
