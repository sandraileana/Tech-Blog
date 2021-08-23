
const router = require('express').Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

// Get a single post and all the comments that belong to that comment as well as the users that created the post and comments
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['name']
      },
      raw:true,
      nest:true
    });

    const commentData = await Comment.findAll({
      attributes: ['content', 'date'],
      where: {
        post_id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['name', 'id']
      },
      raw:true,
      nest:true
    });

    res.render('post', {
      postData, 
      commentData,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;