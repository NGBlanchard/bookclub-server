const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  pubdate: {
    type: String,
    trim: true,
    required: false,
  },
  cover: {
    type: String,
    trim: true,
    required: false,
  },
  est_time: {
    type: String,
    trim: true,
    required: false,
  }
});



module.exports = User = mongoose.model("books", UserSchema);
