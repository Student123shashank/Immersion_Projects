const express = require("express");
const Vehicle = require("../models/vehicle");
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error", "You must be logged in");
  res.redirect("/login");
}


router.get("/", isLoggedIn, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("vehicles/index", { vehicles });
});


router.get("/new", isLoggedIn, (req, res) => {
  res.render("vehicles/new");
});


router.post("/", isLoggedIn, async (req, res) => {
  await Vehicle.create(req.body);
  res.redirect("/vehicles");
});


router.get("/:id", isLoggedIn, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("vehicles/show", { vehicle });
});


router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("vehicles/edit", { vehicle });
});


router.put("/:id", isLoggedIn, async (req, res) => {
  await Vehicle.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/vehicles");
});


router.delete("/:id", isLoggedIn, async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.redirect("/vehicles");
});

module.exports = router;
