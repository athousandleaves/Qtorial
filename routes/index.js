var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var tutorial = require("../models/tutorial");
var hbs = require("express-handlebars");