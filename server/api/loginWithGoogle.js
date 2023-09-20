const express = require("express");
const passport = require("passport");
const router = express.Router();

const successLoginUrl =
  process.env.SUCCESS_LOGIN_URL || "http://localhost:3000/login/success";
const errorLoginUrl =
  process.env.FAILURE_LOGIN_URL || "http://localhost:3000/login/error";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google try again later",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
	(req, res) => {
		console.log("🚀 ~ file: loginWithGoogle.js:23 ~ req:user", req.user)
		
		res.redirect(successLoginUrl)
	}

);

module.exports = router;
