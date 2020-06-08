const express = require("express");
const Book = require("../models/Book");
const bookRoutes = express.Router();

/**
 * @route   books
 * @desc    Get all books
 * @access  Private
 */

bookRoutes.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) throw Error("No books exist");
    res.json(books);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

///////////////////////////////////////////////////////

/**
 * @route   POST books/addbook
 * @desc    add new book
 * @access  Private/Admin
 */

bookRoutes.post("/addbook", async (req, res) => {
  const r =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  console.log(r);
  const book = new book({
    _id: mongoose.Types.ObjectId(),
    bookname: req.body.bookname,
    password: req.body.password,
    isAdmin: req.body.admin,
    uuid: r
  });
  console.log(book);
  book
    .save()
    .then(result => {
      res.status(200).json({
        book: "book Added!"
      });
    })
    .catch(err => {
      console.log(err);
    });
});

/**
 * @route   POST books/deletebook
 * @desc    Delete book
 * @access  Private/Admin
 */

bookRoutes.post("/deletebook", async (req, res) => {
  const u = req.body.uuid;
  book.find({ uuid: u })
    .remove()
    .exec();
  res.status(200).json({
    book: "book Deleted!"
  });
});

/**
 * @route   GET books/getbookBybookname
 * @desc    Get book by bookname
 * @access  Private/Admin
 */

bookRoutes.get("/getbookBybookname", async (req, res) => {
  const u = req.query.bookname;
  book.findOne({ bookname: u }, function(err, obj) {
    if (obj) {
      res.status(200).json({
        book: obj
      });
    } else {
      res.status(200).json({
        book: "na"
      });
    }
  });
});

/**
 * @route   GET books/validAdmin
 * @desc    Validates book as administrator
 * @access  Private/Admin
 */

bookRoutes.get("/validAdmin", async (req, res) => {
  const uid = req.query.uuid;
  book.findOne({ uuid: uid }, function(err, docs) {
    if (docs.isAdmin) {
      res.status(200).json({
        admin: true
      });
    } else {
      res.status(200).json({
        admin: false
      });
    }
  });
});

/**
 * @route   GET api/auth/book
 * @desc    Get book data
 * @access  Private
 */

// bookRoutes.get('/book', auth, async (req, res) => {
//   try {
//     const book = await book.findById(req.book.id).select('-password');
//     if (!book) throw Error('book Does not exist');
//     res.json(book);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

module.exports = bookRoutes;
