var express = require("express");
var router = express.Router();
var tutorial = require("../models/tutorial");
var Comment = require("../models/comment");
var topic = require("../models/topic");
var middleware = require("../middleware");
var request = require("request");