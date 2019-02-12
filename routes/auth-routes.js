// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// User model
const User = require("../models/Usuario");
const Categoria = require('../models/Categoria')
const Subcategoria = require('../models/Subcategoria')
const Anuncios = require('../models/Anuncios')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


console.log("entra a auth-outes");


//Signup route
authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// signup post
authRoutes.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indique usuario y contraseña por favor" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("auth/signup", { message: "El usuario ya existe" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Algo salio mal, vuelve a intentar por favor" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});


// login route
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

//login post
authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/userhome",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));



authRoutes.get("/userhome", ensureLogin.ensureLoggedIn(), (req, res) => {
  Categoria.find()
    .then(categoria =>{
      console.log(req.user)
      res.render("userhome", {user: req.user, categoria });
    })
    .catch(err =>{
      console.log(err)
    })
});


authRoutes.get("/login/sesion", ensureLogin.ensureLoggedIn(), (req, res) => {
  Categoria.find()
    .then(categoria =>{
      console.log("Estoy logueado")
      res.render("userhome", {user: req.user, categoria });
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get("/logout", (req, res) => {
  console.log("loged out")
  req.logout();
  res.redirect("/login");

});

module.exports = authRoutes;

