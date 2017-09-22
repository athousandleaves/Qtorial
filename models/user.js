var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
