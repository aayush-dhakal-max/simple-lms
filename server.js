const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.get("/", (req, res) => {
  res.send("Hello Node");
});

const server = http.createServer(app);
server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
