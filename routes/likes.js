const express = require("express");
const likeRoutes = express.Router();
const Like = require("../models/Like");
const mongoose = require("mongoose");

likeRoutes.get("/", async (req, res) => {
  try {
    const likes = await Like.find();
    if (!likes) throw Error("No likes exist");
    res.json(likes);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   GET getLikes
 * @desc    Get likes for item
 */

likeRoutes.post("/getLikes", (req, res) => {
  const variable = { attached_to: req.body.attached_to };

  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});

/**
 * @route   POST /upLike
 * @desc    Add like to item
 */

likeRoutes.post("/upLike", (req, res) => {
  variable = { attached_to: req.body.attached_to, user: req.body.user };
  const like = new Like({
    _id: mongoose.Types.ObjectId(),
    id: req.body.id,
    attached_to: req.body.attached_to,
    user: req.body.user,
  });

  like
    .save()
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route   POST /unLike
 * @desc    Delete like
 */

likeRoutes.post("/unLike", (req, res) => {
  Like.findOneAndDelete(req.body).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = likeRoutes;
