const router = require('express').Router();
const { restart } = require('nodemon');
const { Post } = require('../../models');

const withAuth = require('../../utils/auth');

// CREATE new post
router.post('/', withAuth, async (req, res) => {
  console.log('post request for post');
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

// PUT route for updating post
// WHY NOT WORKING
router.put('/:id', withAuth, async (req, res) => {
  try {
    console.log('something');
    // array destructuring
    const [affectedRows] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRows > 0) {
      console.log('affectedRows > 0');
      console.log(affectedRows);
      res.json(affectedRows);
      // res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(400).json(error);
  }
})

// DELETE post
router.delete('/:id', withAuth, async (req, res) => {

})

module.exports = router;
