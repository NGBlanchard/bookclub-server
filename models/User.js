const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  profile_img: {
    type: String,
    trim: true,
    required: false,
  },
  current: {
    type: String,
    trim: true,
    required: false,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  progress: {
    type: Number,
    trim: false,
    required: false,
  },
  website: {
    type: String,
    trim: true,
    required: false,
  },
  following : {
    type: String,
    required: false,
  },
  date_created: { type: Date, default: Date.now }
});

// hash user password before saving into database
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = User = mongoose.model("users", UserSchema);
