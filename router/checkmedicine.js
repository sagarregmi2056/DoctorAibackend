const express = require("express");

const {
  checkmedicine,
  getMedicineData,
  checkMedicinedefault,
  checkInstruments,
  checkSymptoms,
} = require("../Controller/checkmedicine");

const { uploadimageforscan, uploaddocuments } = require("../helper/index");
// const { requireUserSignin } = require("../Controller/auth-user");
const router = express.Router();

// router.post("/check",  uploadimageforscan, checkmedicine);
// router.get("/history", requireUserSignin, getMedicineData);

router.post("/checkmed", uploadimageforscan, checkMedicinedefault);

router.post("/checkins", uploadimageforscan, checkInstruments);
router.post("/checksymptoms", uploadimageforscan, checkSymptoms);

module.exports = router;
