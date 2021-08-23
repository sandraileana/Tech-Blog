const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Get all posts + includes the user creator
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
      raw: true,
      nest: true,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single post and comments attached the post, including the user creator of the post and comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "content", "date"],
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    const commentData = await Comment.findAll({
      attributes: ["content", "date"],
      where: {
        post_id: req.params.id,
      },
      include: {
        model: User,
        attributes: ["name", "id"],
      },
      raw: true,
      nest: true,
    });
    res.status(200).json([postData, commentData]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post("/", (req, res) => {
  const today = new Date();
  const formattedDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  Post.create({
    title: req.body.title,
    content: req.body.content,
    date: formattedDate,
    user_id: req.body.userID,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update an existing post
router.put("/", (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: { id: req.body.postID, user_id: req.session.user_id },
    }
  )
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a single post, only if the post belongs to the user that is logged in
router.delete("/", (req, res) => {
  Post.destroy({
    where: { id: req.body.postID, user_id: req.session.user_id },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;