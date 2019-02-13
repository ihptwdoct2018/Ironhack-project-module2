// routes/auth-routes.js
const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const multer = require("multer");
const ensureLogin = require("connect-ensure-login");
const upload = multer({dest: "./public/uploads"})

// User model
const User = require("../models/Usuario");
const Categoria = require('../models/Categoria')
const Subcategoria = require('../models/Subcategoria')
const Anuncios = require('../models/Anuncios')
const Tienda = require('../models/Tienda')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

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
        res.redirect("/login");
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
      res.render("userhome", {user: req.user, categoria });
    })
    .catch(err =>{
      console.log(err)
    })
});


authRoutes.get("/login/sesion", ensureLogin.ensureLoggedIn(), (req, res) => {
  Categoria.find()
    .then(categoria =>{
      res.render("userhome", {user: req.user, categoria });
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");

});


//Rutas Tienda
/*GET Tienda*/
authRoutes.get("/administrartienda", ensureLogin.ensureLoggedIn(), (req, res) => {
  Tienda.find({'user_id': req.user._id})
    .then(tiendas =>{
      res.render('administrartienda', {tiendas});
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/altatienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('altatienda')
});

authRoutes.get('/detalletienda/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  res.render('detalletienda',{idtienda})
});


//Rutas Producto
/*GET producto*/
authRoutes.get('/altaproductos/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  Categoria.find()
    .then(categoria =>{
      categoria.forEach((cat)=>cat.idtienda=idtienda)
      res.render('altaproductos',{categoria})
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/altaproductos/cat/:idcat/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  let idcat = req.params.idcat;
  Subcategoria.find({'identificador_padre': idcat})
    .then(subcategoria =>{
      subcategoria.forEach((subcat)=>{
        subcat.idtienda=idtienda
        subcat.idcat=idcat
      });
      res.render('altaproductos',{subcategoria})
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/altaproductos/cat/:idcat/:idsubcat/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  let idcat = req.params.idcat;
  let idsubcat = req.params.idsubcat;
  let niveles = new Object();
  niveles.categoria=idcat;
  niveles.subcategoria_padre=idcat;
  niveles.subcategoria=idsubcat;
  niveles.idtienda=idtienda;
  console.log(niveles);
  Subcategoria.find({'identificador_padre': idsubcat})
    .then(subcategoria1 =>{
      subcategoria1.forEach((subcat1)=>{
        subcat1.idtienda=idtienda
        subcat1.idcat=idcat
        subcat1.idsubcat=idsubcat
      });
      if(subcategoria1.length === 0){
        res.render('altaproductos',{niveles})
      }
      else
        res.render('altaproductos',{subcategoria1})
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/altaproductos/cat/:idcat/:idsubcat/:idsubcat2/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  let idcat = req.params.idcat;
  let idsubcat = req.params.idsubcat;
  let idsubcat2 = req.params.idsubcat2;
  let niveles = new Object();
  niveles.categoria=idcat;
  niveles.subcategoria_padre=idsubcat;
  niveles.subcategoria=idsubcat2;
  niveles.idtienda=idtienda;
  Subcategoria.find({'identificador_padre': idsubcat2})
    .then(subcategoria2 =>{
      subcategoria2.forEach((subcat2)=>{
        subcat2.idtienda=idtienda
        subcat2.idcat=idcat
        subcat2.idsubcat=idsubcat
        subcat2.idsubcat2=idsubcat2
      });
      if(subcategoria2.length === 0){
        res.render('altaproductos',{niveles})
      }
      else
        res.render('altaproductos',{subcategoria2})
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/altaproductos/cat/:idcat/:idsubcat/:idsubcat2/:idsubcat3/:idtienda', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let idtienda = req.params.idtienda;
  let idcat = req.params.idcat;
  let idsubcat = req.params.idsubcat;
  let idsubcat2 = req.params.idsubcat2;
  let idsubcat3 = req.params.idsubcat3;
  let niveles = new Object();
  niveles.categoria=idcat;
  niveles.subcategoria_padre=idsubcat2;
  niveles.subcategoria=idsubcat3;
  niveles.idtienda=idtienda;
  Subcategoria.find({'identificador_padre': idsubcat3})
    .then(subcategoria3 =>{
      subcategoria3.forEach((subcat3)=>{
        subcat3.idtienda=idtienda
        subcat3.idcat=idcat
        subcat3.idsubcat=idsubcat
        subcat3.idsubcat2=idsubcat2
        subcat3.idsubcat2=idsubcat3
      });
      if(subcategoria3.length === 0){
        res.render('altaproductos',{niveles})
      }
      else
        res.render('altaproductos',{subcategoria3})
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = authRoutes;
