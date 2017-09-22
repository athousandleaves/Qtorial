var express = require("express");
var router = express.Router({ mergeParams: true });
var tutorial = require("../models/tutorial");
var Comment = require("../models/comment");
var middleware = require("../middleware");