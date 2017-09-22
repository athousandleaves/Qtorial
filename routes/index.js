var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var tutorial = require("../models/tutorial");
var hbs = require("express-handlebars");

// ===============
// AUTH ROUTES
//================

  //show register form
router.get("/register", function(req, res) {
  res.render("register");
});

  //handle sign up logic
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
