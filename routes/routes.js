const { Router } = require("express");
const {
  signup,
  login,
  view_student_profile,
  view_teacher_profile,
} = require("../controllers/userAuth");
const { studentCheck, teacherCheck } = require("../middleware/jwtAuth");

const router = Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/student/profile", studentCheck, view_student_profile);
router.get("/teacher/profile", teacherCheck, view_teacher_profile);

module.exports = router;
