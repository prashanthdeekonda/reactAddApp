const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const config = require("config");
// const db = config.get("mongoURI");
const db = process.env.MONGOOSE_DB_CONNECTION_STRING;
mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
