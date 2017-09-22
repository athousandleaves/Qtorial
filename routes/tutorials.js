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

// show you all the tutorials
router.get("/tutorials/all", function(req, res) {
    // Get all tutorials from DB
    tutorial.find({}, function(err, alltutorials) {
      if (err) {
        console.log(err);
      } else {
        res.render("tutorials/all", { tutorials: alltutorials });
      }
    });
  });

// CREATE a new tutorial
router.post("/tutorials/all", middleware.isLoggedIn, function(req, res) {
    var name = "";
    var thumbnail = "";
    var description = "";
    var videoID = req.body.videoID;
    var topic = req.body.topic;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var parsedObj;
    var APIkey = process.env.APIKEY;
  
    request(
      "https://www.googleapis.com/youtube/v3/videos?id=" +
        videoID +
        "&part=snippet&key=" +
        APIkey,
      function(err, response, body) {
        if (err) {
          console.log(err);
        } else {
          var parsedObj = JSON.parse(body);
          var name = parsedObj.items[0].snippet.title;
          var description = parsedObj.items[0].snippet.description;
  
          // find the correct thumbnail url
          if (parsedObj.items[0].snippet.thumbnails.maxres) {
            var thumbnail = parsedObj.items[0].snippet.thumbnails.maxres.url;
          } else if (parsedObj.items[0].snippet.thumbnails.standard) {
            var thumbnail = parsedObj.items[0].snippet.thumbnails.standard.url;
          } else if (parsedObj.items[0].snippet.thumbnails) {
            var thumbnail = parsedObj.items[0].snippet.thumbnails.high.url;
          }
        }
        // make a new object as a second step
        var newtutorial = {
          name: name,
          thumbnail: thumbnail,
          videoID: videoID,
          description: description,
          topic: topic,
          author: author
        };
        // Create a new tutorial and save it to the DB
        tutorial.create(newtutorial, function(err, newlyCreated) {
          if (err) {
            console.log(err);
          } else {
            //redirect back to tutorials page
            console.log(newlyCreated);
            res.redirect("/tutorials/all");
          }
        });
      }
    );
  });

// show the form that will send data to the new post route
router.get("/tutorials/new", middleware.isLoggedIn, function(req, res) {
    topic.find({}, function(err, alltopics) {
      if (err) {
        console.log(err);
      } else {
        res.render("tutorials/new", { topics: alltopics });
      }
    });
    // res.render("tutorials/new");
  });

// SHOW - shows more info about one tutorial
router.get("/tutorials/:id", function(req, res) {
    // Find tutorial and populate comments on the tutorial, and then execute the query we made
    tutorial
      .findById(req.params.id)
      .populate("comments")
      .exec(function(err, foundtutorial) {
        if (err) {
          console.log(err);
        } else {
          // render show template with that tutorial
          res.render("tutorials/show", { tutorial: foundtutorial });
        }
      });
    // req.params.id
  });

// EDIT tutorial route
router.get("/tutorials/:id/edit", middleware.isTutorialOwner, function(req, res) {
    tutorial.findById(req.params.id, function(err, foundtutorial) {
      res.render("tutorials/edit", { tutorial: foundtutorial });
    });
  });

// UPDATE tutorial route
router.put("/tutorials/:id", middleware.isTutorialOwner, function(req, res) {
    //find and update correct tutorial
    tutorial.findByIdAndUpdate(req.params.id, req.body.tutorial, function(err, updatedtutorial) {
      if (err) {
        res.redirect("/tutorials/all");
      } else {
        res.redirect("/tutorials/" + req.params.id);
      }
    });
    //redirect to show page
  });