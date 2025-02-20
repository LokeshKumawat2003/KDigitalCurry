const mongoose = require("mongoose");

const getDb = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/kdigital");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = getDb;
