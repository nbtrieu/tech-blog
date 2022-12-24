const router = require('express').Router();
const { Post } = require('../../models');

const withAuth = require('../../utils/auth');

// CREATE new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    req.status(200).json(newPost);

  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
