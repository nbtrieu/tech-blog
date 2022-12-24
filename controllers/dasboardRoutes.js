const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard-all-posts', {
      layout: 'dashboard',
      ...posts, 
    });

  } catch (error) {
    console.log(error);
    res.redirect('login');
  }
});

module.exports = router;
