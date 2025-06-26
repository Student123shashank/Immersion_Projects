const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

router.get("/register", (req, res) => res.render("auth/register"));
router.post("/register", async (req, res) => {
  const { username, password, email, age } = req.body;
  const user = new User({ username, password, email, age });
  await user.save();
  req.flash("success", "Registered Successfully");
  res.redirect("/login");
});

router.get("/login", (req, res) => res.render("auth/login"));
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/vehicles",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success", "Logged out");
    res.redirect("/login");
  });
});

module.exports = router;
