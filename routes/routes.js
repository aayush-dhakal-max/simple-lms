const { Router } = require("express");
const { signup, login } = require("../controllers/userAuth");

const router = Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
