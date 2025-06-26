require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const User = require("./models/user");
const vehicleRoutes = require("./routes/vehicle");
const authRoutes = require("./routes/auth");

const app = express();


mongoose.connect("mongodb://localhost:27017/travel");


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));


app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password))) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.get("/", (req, res) => {
  res.redirect("/login");
});


app.use("/", authRoutes);
app.use("/vehicles", vehicleRoutes);


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
