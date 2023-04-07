const JWT = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

const studentCheck = async (req, res) => {
  const jwt_token = req.cookie.JWT;
  console.log(jwt_token);
};
