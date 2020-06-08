const express = require("express");
const commentRoutes = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment");

/**
 * @route   POST comments/addComment
 * @desc    Add comment
 * @access  Private
 */

commentRoutes.post("/addcomment", async (req, res) => {
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    id: req.body.id,
    content: req.body.content,
    attached_to: req.body.attached_to,
    author: req.body.author,
    author_id: req.body.author_id,
    author_img: req.body.author_img,
    book: req.body.book,
    title: req.body.title
  });
  comment 
    .save()
    .then(result => {
      res.status(200).json({
        device: "Comment Added!"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * @route   GET comments
 * @desc    Get comments
 * @access  Private
 */

commentRoutes.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) throw Error("No comments exist");
    res.json(comments);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});


module.exports = commentRoutes;
