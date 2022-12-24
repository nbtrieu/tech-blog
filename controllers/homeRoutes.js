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
          attributes: ['username'],
        },
      ]
    });

    // Serialize data for handlebars template to read (array of serialized project objects)
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into handlebars template
    res.render('home-all-posts', { ...posts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET one single post on homepage
router.get('/post/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created'],
        }
      ]
    });

    const post = dbPostData.map((post) => post.get({ plain: true }));
    res.render('single-posts', { ...post });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

// GET login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})

module.exports = router;
