require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { NODE_ENV } = require( './config');
const config = require("./config");
const { MONGODB_URL } = config;
// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments")
const bookRoutes = require("./routes/books")
const likeRoutes = require("./routes/likes")

const app = express();

const morganSetting = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
  
// Middleware
app.use(morgan(morganSetting));
app.use( helmet() );
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB Config
const db = `${MONGODB_URL}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Alcove Reads Server Ready"))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Howdy, Alcove Reads')
  })

// Use Routes
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/comments", commentRoutes)
app.use("/books", bookRoutes)
app.use("/likes", likeRoutes)

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
