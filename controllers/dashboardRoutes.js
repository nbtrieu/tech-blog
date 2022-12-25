const router = require('express').Router();
const { Post } = require('../models');

const withAuth = require('../utils/auth');

// GET all posts on dashboard
// WHY IS THE GET ROUTE NOT WORKING 
router.get('/', withAuth, async (req, res) => {
  // console.log('starting GET route for all posts on dashboard');
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    // console.log(posts);

    res.render('dashboard-all-posts', {
      layout: 'dashboard',
      posts, 
    });

  } catch (error) {
    console.log(error);
    res.redirect('login');
  }
});

// GET to create new post page
router.get('/new', withAuth, async (req, res) => {
  try {
    // Don't need a post object because it hasn't existed!!
    res.render('create-new-post', {
      layout: 'dashboard',
    });

  } catch (error) {
    console.log(error);
    res.status(400).json(err);
  }
});

// GET to edit post page
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // NEED a post object here to edit!!
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });

    } else {
      res.status(404).end();
    }

  } catch (error) {
    console.log(error);
    // res.redirect('/login');
  }
})

module.exports = router;
