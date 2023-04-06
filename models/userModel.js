const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenum: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  active_status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "student",
  },
});

const USER = mongoose.model("users", userSchema);

module.exports = { USER };
