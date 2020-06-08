const express = require("express");
const User = require("../models/User");
const userRoutes = express.Router();
const auth = require("../middleware/authware");

/**
 * @route   users
 * @desc    Get all users
 * @access  Private
 */

userRoutes.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

///////////////////////////////////////////////////////

/**
 * @route   POST users/addUser
 * @desc    add new user
 * @access  Private/Admin
 */

userRoutes.post("/addUser", async (req, res) => {
  const r =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log(r);
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.admin,
    uuid: r,
  });
  console.log(user);
  user
    .save()
    .then((result) => {
      res.status(200).json({
        user: "User Added!",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route   POST users/update
 * @desc    update user progress
 */

userRoutes.post("/update", async (req, res) => {
  const { user, progress } = req.body;
  User.updateOne({ id: user }, { $set: { progress: progress } })
    .then((result) => {
      res.status(200).json("Progress updated");
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route   POST users/following
 * @desc    update the book the user is following
 */

userRoutes.post("/following", async (req, res) => {
  const { user, following } = req.body;
  User.updateOne({ id: user }, { $set: { following: following } })
    .then((result) => {
      res.status(200).json("Current book updated");
    })
    .catch((err) => {
      console.log(err);
    });
});

userRoutes.post("/profile", async (req, res) => {
  console.log(req.body)
  const { id, username, website, description, profile_img, progress } = req.body;
  User.updateOne(
    { id: id },
    {
      $set: {
        progress: progress,
        username: username,
        website: website,
        description: description,
        profile_img: profile_img,
        progress: progress
      },
    }
  )
    .then((result) => {
      res.status(200).json("Progress updated");
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @route   POST users/deleteUser
 * @desc    Delete user
 * @access  Private/Admin
 */

userRoutes.post("/deleteUser", async (req, res) => {
  const u = req.body.uuid;
  User.find({ uuid: u }).remove().exec();
  res.status(200).json({
    user: "User Deleted!",
  });
});

/**
 * @route   GET users/profile
 * @desc    Get user and get profile
 */

userRoutes.get("/current/:userId", async (req, res) => {
  const u = req.params.userId;
  User.findOne({ id: u }, function (err, obj) {
    if (obj) {
      res.status(200).json({
        user: obj,
      });
    } else {
      res.status(200).json({
        user: "na",
      });
    }
  });
});

userRoutes.get("/:id", async (req, res) => {
  const u = req.params.id;
  User.findOne({ id: u }, function (err, obj) {
    if (obj) {
      res.status(200).json({
        user: obj,
      });
    } else {
      res.status(200).json({
        user: "na",
      });
    }
  });
});

/**
 * @route   GET users/validAdmin
 * @desc    Validates user as administrator
 * @access  Private/Admin
 */

userRoutes.get("/validAdmin", async (req, res) => {
  const uid = req.query.uuid;
  User.findOne({ uuid: uid }, function (err, docs) {
    if (docs.isAdmin) {
      res.status(200).json({
        admin: true,
      });
    } else {
      res.status(200).json({
        admin: false,
      });
    }
  });
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

// userRoutes.get('/user', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) throw Error('User Does not exist');
//     res.json(user);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

module.exports = userRoutes;
