const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
      console.log("DB Connection Success");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDB;
