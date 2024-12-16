const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllcandidateNames,
  getcandidateByUserid,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

// Use the directly imported function
router.get("/get-all-names", getAllcandidateNames);
router.get("/get-names-by-userid", getcandidateByUserid);

module.exports = router;
