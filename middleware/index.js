var Tutorial = require("../models/tutorial");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isTutorialOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
      Tutorial.findById(req.params.id, function(err, foundTutorial) {
        if (err) {
          res.redirect("back");
        } else {
          // does user own tutorial?
          if (foundTutorial.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
  };

  middlewareObj.isCommentOwner = function(req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
          res.redirect("back");
        } else {
          // does user own comment?
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
          }
        }
      });
    } else {
      res.redirect("back");
    }
  };