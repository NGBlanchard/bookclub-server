module.exports = {
  PORT: process.env.PORT || 9090,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://heroku_x9xpcb22:MerryXmas1!@ds125486.mlab.com:25486/heroku_x9xpcb22",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "AlcoveReads",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
};
