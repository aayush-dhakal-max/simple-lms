const { Router } = require("express");
const {
  signup,
  login,
  view_student_profile,
} = require("../controllers/userAuth");

const router = Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/student/profile", view_student_profile);

module.exports = router;
