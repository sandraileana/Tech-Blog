const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");
const redirectToID = require("../utils/redirect");
const validateUser = require("../utils/validate");
const validatePostAccess = require("../utils/validateEdit");

// Validates if the user is logged in, attaches the user id to the url and redirects to the "/:id" dashboard route
router.get("/", withAuth, redirectToID, async (req, res) => {});

// Gets the posts of a single user, validates the posts accessed belongs to the user logged in (dashboard view)
router.get("/:id", withAuth, validateUser, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.params.id },
      raw: true,
      nest: true,
    });

    res.render("dashboard", {
      postData,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get specific post of a specific user
// ValidatePostAccess finds out if the currentuser attached to the id is the same as the one logged in (stored in session)
router.get("/edit/:id", withAuth, validatePostAccess, async (req, res) => {
  // Get all the text after the string "post=" this gives us the post id
  const postID = Number(req.params.id.match(/(?<=post=)(.*)/)[0]);
  try {
    const postData = await Post.findByPk(postID, {
      raw: true,
      nest: true,
    });
    res.render("editPost", {
      postData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders the new post page
// Validate if a user is logged in, validate if the user in session same user that is being passed in the url
router.get("/create/:id", withAuth, validateUser, async (req, res) => {
  try {
    res.render("newPost", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;