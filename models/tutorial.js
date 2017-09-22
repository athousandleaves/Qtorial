var mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
    name: String,
    topic: String,
    thumbnail: String,
    description: String,
    videoID: String,
    author: {
      id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
    },
    created: {type: Date, default: Date.now},
    comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
      }
    ]
});

//assign this Schema to a variable
var Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;