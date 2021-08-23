const withAuth = (req, res, next) => {
  // If user is logout, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // If logged in call the next middleware
    next();
  }
};

module.exports = withAuth;
