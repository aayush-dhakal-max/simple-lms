const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { USER } = require("../models/userModel");

const signup = async (req, res) => {
  const { fname, lname, email, phonenum, password } = req.body;
  try {
    if (fname && lname && email && phonenum && password) {
      await USER.create({
        fname: fname,
        lname: lname,
        email: email,
        phonenum: phonenum,
        password: await bcryptjs.hash(password, 12),
      })
        .then((result) => {
          if (result) {
            return res.send(result);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.send("Please enter all the required fields");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const userCheck = await USER.findOne({ email: email });
      const passwordCheck = await bcryptjs.compare(
        password,
        userCheck.password
      );
      if (userCheck && passwordCheck) {
        return res.send(
          `You are logged in as: ${userCheck.fname} ${userCheck.lname}`
        );
      } else {
        return res.send("Incorrect Login Credentials");
      }
    } else {
      return res.send("Please enter all the required fields");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { signup, login };
