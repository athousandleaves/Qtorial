var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var tutorial = require("../models/tutorial");
var hbs = require("express-handlebars");

// ===============
// AUTH ROUTES
//================

// show register form
router.get("/register", function(req, res) {
  res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

// show login form
router.get("/login", function(req, res) {
  res.render("login");
});

// handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// logout route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out successfully!");
  res.redirect("/");
});

// user display
router.get("/user/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    res.render("user/show", { User: foundUser });
  });
});

// authentication check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
  
module.exports = router;