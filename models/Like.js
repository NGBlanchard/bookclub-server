const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
 _id: {
  type: String,
  trim: true,  
 },
 id: {
  type: String,
  trim: true,  
  required: true,
 },
 user: {
   type: String,
   trim: true,
   required: true,
 },
 attached_to: {
  type: String,  
  required: true,
 }, 
 date_created : { type : Date, default: Date.now }
});


module.exports = mongoose.model('Like', LikeSchema);