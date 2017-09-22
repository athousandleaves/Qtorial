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