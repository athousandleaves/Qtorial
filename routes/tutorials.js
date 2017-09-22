var express     = require("express");
var router      = express.Router();
var tutorial    = require("../models/tutorial");
var Comment     = require("../models/comment");
var topic       = require("../models/topic");
var middleware  = require("../middleware");
var request     = require("request");

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

// show you the topics
router.get("/topics", function(req, res) {
    topic.find({}, function(err, alltopics) {
      if (err) {
        console.log(err);
      } else {
        tutorial.find({}, function(err, alltutorials) {
          if (err) {
            console.log(err);
          } else {
            res.render("topics/topics", {
              topics: alltopics,
              tutorials: alltutorials
            });
          }
        });
      }
    });
  });

// shows more info about a topic
router.get("/topics/:id", function(req, res) {
    // find topic and populate tutorials associated with it
    topic
      .findById(req.params.id)
      .populate("tutorials")
      .exec(function(err, foundTopic) {
        if (err) {
          console.log(err);
        } else {
          tutorial.find({ topic: foundTopic.name }, function(err, alltutorials) {
            if (err) {
              console.log(err);
            } else {
              res.render("topics/show", {
                topic: foundTopic,
                tutorials: alltutorials
              });
            }
          });
        }
      });
  });
  