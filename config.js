module.exports = {
  PORT: process.env.PORT || 9090,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URL: process.env.MONGODB_URL,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "AlcoveReads",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
};
