var express = require("express");
var router = express.Router({ mergeParams: true });
var tutorial = require("../models/tutorial");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments new
router.get("/tutorials/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    //find tutorial by ID
    tutorial.findById(req.params.id, function(err, tutorial) {
      if (err) {
        console.log(err);
      } else {
        res.render("comments/new", { tutorial: tutorial });
      }
    });
  });

// Comments create
router.post("/tutorials/:id/comments/", middleware.isLoggedIn, function(req, res) {
    // look up tutorial by ID
    tutorial.findById(req.params.id, function(err, tutorial) {
      if (err) {
        console.log(err);
        res.redirect("home");
      } else {
        Comment.create(req.body.comment, function(err, comment) {
          if (err) {
            console.log(err);
          } else {
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            tutorial.comments.push(comment);
            tutorial.save();
            res.redirect("/tutorials/" + tutorial._id);
          }
        });
      }
    });
    // create comment
    // connect new comment to tutorial
    // redirect to tutorial show page
  });