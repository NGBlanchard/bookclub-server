const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
 _id: {
  type: String,
  trim: true,  
  required: true,
 },
 id: {
  type: String,
  trim: true,  
  required: true,
 },
 author: {
   type: String,
   trim: true,
   required: true,
 },
 content: {
  type: String,
  trim: true,  
  required: true,
 },
 author_img: {
   type: String,
   trim: true,
   required: false,
 },
 author_id: {
  type: String,
  trim: true,  
  required: true,
 },
 attached_to: {
  type: String,
  trim: true,  
  required: true,
},
book: {
  type: String,
  trim: true,
  required: true
},
title: {
  type: String,
  trim: true,
  required: false,
},
 date_created : { type : Date, default: Date.now }
});


module.exports = mongoose.model('Comment', CommentSchema);