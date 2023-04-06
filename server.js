const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "public")));
app.set("view engine", "ejs");

app.use("/", require("./routes/routes"));

const server = http.createServer(app);
server.listen(process.env.PORT, "0.0.0.0", () => {
  require("./database/dbConnection")();
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
