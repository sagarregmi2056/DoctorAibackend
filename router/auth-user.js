const express = require("express");

const {
  signup,
  signin,

  forgotPassword,
  resetPassword,
  userrefreshToken,
} = require("../Controller/auth-user");

const { passwordResetValidator } = require("../validator");

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.put("/forgot-password", forgotPassword);

router.put("/reset-password", passwordResetValidator, resetPassword);

router.post("/userrefreshtoken", userrefreshToken);

module.exports = router;
