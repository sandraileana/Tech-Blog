const router = require("express").Router();
const { Post, User } = require("../models");

// Get all the posts of all users and render the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['name']
      },
      raw:true,
      nest:true
    });
    res.render("homepage", {
      postData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render the loging page
router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render the signup page
router.get("/signup", (req, res) => {
  try {
    res.render("signup", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
