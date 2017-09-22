var mongoose = require('mongoose'),
tutorial     = require('../models/tutorial');

var topicSchema = new mongoose.Schema({
name: String,
image: String,
description: String,
tutorials: [
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial"
  }
]
});

//assign this Schema to a variable
var topic = mongoose.model("topic", topicSchema);

module.exports = topic;