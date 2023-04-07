const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { USER } = require("../models/userModel");
const { public_key, private_key } = require("../utils/keys");

const maxAge = 1 * 60 * 60; // 1 hour
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
        .then(async (user) => {
          if (user) {
            const jwt_token = await JWT.sign(
              { email: user.email, role: user.role },
              private_key,
              {
                expiresIn: maxAge,
                algorithm: "RS256",
              }
            );
            res.cookie("JWT", jwt_token, {
              httpOnly: true,
              sameSite: "Strict",
              maxAge: maxAge * 1000,
            });
            return res.json({
              message: `${user.email} Successfully registered`,
              cookie: jwt_token,
            });
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
        const jwt_token = await JWT.sign(
          { email: userCheck.email, role: userCheck.role },
          private_key,
          {
            expiresIn: maxAge,
            algorithm: "RS256",
          }
        );
        res.cookie("JWT", jwt_token, {
          httpOnly: true,
          sameSite: "Strict",
          maxAge: maxAge * 1000,
        });
        return res.json({
          message: `You are logged in as: ${userCheck.fname} ${userCheck.lname}`,
          cookie: jwt_token,
        });
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

const view_student_profile = async (req, res) => {
  return res.json({
    message: `You are successfully logged in as user: ${req.email}`,
  });
};
module.exports = { signup, login, view_student_profile };
