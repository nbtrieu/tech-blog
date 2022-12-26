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
    res.render('home-all-posts', { posts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET one single post on homepage
router.get('/post/:id', async (req, res) => {
  console.log('before get postdata');
  
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
      ]
    });

    const dbCommentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          required: true,
        },
      ]
    });

    console.log('postData: ', postData);
    if (postData) {
      const post = postData.get({ plain: true });
      const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
      res.render('single-post', { post, comments }); // *BUG: what if i make a separate const for commentData?...
    } else {
      res.status(404).end();
    }

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
