const JWT = require("jsonwebtoken");
const { public_key } = require("../utils/keys");

const studentCheck = async (req, res, next) => {
  const jwt_token = req.cookies.JWT;
  try {
    const verifyToken = JWT.verify(jwt_token, public_key);
    console.log(verifyToken);
    if (verifyToken) {
      req.user = verifyToken.email;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const teacherCheck = async (req, res, next) => {
  const jwt_token = req.cookies.JWT;
  try {
    const verifyToken = JWT.verify(jwt_token, public_key);
    console.log(verifyToken);
    if (verifyToken.role == "teacher") {
      req.user = verifyToken.email;
      next();
    } else {
      return res.status(403).json({ error: "403 Forbidden to this page" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { studentCheck, teacherCheck };
