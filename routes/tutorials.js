var express = require("express");
var router = express.Router();
var tutorial = require("../models/tutorial");
var Comment = require("../models/comment");
var topic = require("../models/topic");
var middleware = require("../middleware");
var request = require("request");

// show page
router.get("/", function(req, res) {
    topic.find({}, function(err, alltopics) {
      if (err) {
        console.log(err);
      } else {
        tutorial.find({}, function(err, alltutorials) {
          if (err) {
            console.log(err);
          } else {
            res.render("home", { topics: alltopics, tutorials: alltutorials });
          }
        });
      }
    });
  });