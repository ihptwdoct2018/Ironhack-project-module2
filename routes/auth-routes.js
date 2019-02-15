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
const Carrito = require('../models/Carrito')
const Compras = require('../models/Compras')

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
  successRedirect: "/perfil",
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
  Anuncios.find({'tienda_id': idtienda})
    .populate("tienda_id")
    .then(anuncios =>{
      res.render('detalletienda',{idtienda,anuncios})
    })
    .catch(err =>{
      console.log(err)
    })
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

//Rutas Perfil
/*GET perfil*/

authRoutes.get('/perfil', ensureLogin.ensureLoggedIn(),(req, res, next) =>{
  res.render('perfil', { perfil: req.user })
});


//Rutas Carrito
/*GET Carrito*/
authRoutes.get("/carrito/add/:idanuncio/:precio/:idpadre/:stock", ensureLogin.ensureLoggedIn(), (req, res) => {
  let idpadre = req.params.idpadre;
  let usuario = req.user;
  let idanuncio = req.params.idanuncio;
  let precio = req.params.precio;
  let stock = req.params.stock;

  Carrito.find({$and: [ {'user_id': usuario},{'orden.anuncio_id': idanuncio} ]})
    .then(carrito =>{
      if(carrito.length === 0){
        const newCarrito =  new Carrito({
          user_id: req.user._id,
          orden: {
            anuncio_id : idanuncio,
            cantidad   : 1,
            subtotal   : precio
          }
        });

        newCarrito.save()
        .then(carritosave=>{
          Anuncios.updateOne({"_id":idanuncio},{$set:{"stock": stock-1}})
          .then(anuncioupdate=>{
            Subcategoria.find({'identificador_padre': idpadre})
            .then(subcategoria =>{
              Anuncios.find({$and:[ {$or: [ {'categoria': idpadre},{'subcategoria_padre': idpadre},{'subcategoria': idpadre} ]}, {stock: {$gt: 0}} ]})
                .populate("tienda_id")
                .then(anuncios =>{
                  anuncios.forEach(anuncio=>anuncio.idpadrecarrito=idpadre)
                  res.render('subcategoria', {subcategoria, anuncios, usuario})
                })
                .catch(err =>{
                  console.log(err)
                })
            })
            .catch(err =>{
              console.log(err)
            })
          })
          .catch(err =>{
            console.log(err)
          })
        })
        .catch(err =>{
          console.log(err)
        })
      }
      else {
        let cantidad = carrito[0].orden.cantidad + 1;
        let subtotal = precio * cantidad;
        Carrito.updateOne({$and: [ {'user_id': usuario},{'orden.anuncio_id': idanuncio} ]}, {$set:{"orden.cantidad": cantidad, "orden.subtotal": subtotal}})
        .then(carritoupdate=>{
          Anuncios.updateOne({"_id":idanuncio},{$set:{"stock": stock-1}})
          .then(anuncioupdate=>{
            Subcategoria.find({'identificador_padre': idpadre})
            .then(subcategoria =>{
              Anuncios.find({$and:[ {$or: [ {'categoria': idpadre},{'subcategoria_padre': idpadre},{'subcategoria': idpadre} ]}, {stock: {$gt: 0}} ]})
                .populate("tienda_id")
                .then(anuncios =>{
                  anuncios.forEach(anuncio=>anuncio.idpadrecarrito=idpadre)
                  res.render('subcategoria', {subcategoria, anuncios, usuario})
                })
                .catch(err =>{
                  console.log(err)
                })
            })
            .catch(err =>{
              console.log(err)
            })
          })
          .catch(err =>{
            console.log(err)
          })
        })
        .catch(err =>{
          console.log(err)
        })
      }
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/carrito', ensureLogin.ensureLoggedIn(),(req, res, next) =>{
  let idusuario = req.user._id;
  let costototal=0;
  Carrito.find({'user_id': idusuario})
    .populate("orden.anuncio_id")
    .then(carrito =>{
      carrito.forEach(carro=>{
        costototal=costototal+carro.orden.subtotal
      })
      carrito.costototal=costototal
      res.render('detallecarrito',{carrito})
    })
    .catch(err =>{
      console.log(err)
    })
});

authRoutes.get('/carrito/delete/:idorden', ensureLogin.ensureLoggedIn(),(req, res, next) =>{
  let idorden = req.params.idorden;
  let idusuario = req.user._id;
  let costototal=0;

  Carrito.find({'_id': idorden})
  .then(carrito=>{
    let cantidad = carrito[0].orden.cantidad;
    let idanuncio = carrito[0].orden.anuncio_id;
    Anuncios.find({"_id": idanuncio})
    .then(anuncio=>{
      let stock = anuncio[0].stock + cantidad
      Anuncios.updateOne({"_id": idanuncio},{$set:{"stock": stock}})
      .then(anuncioupdate=>{
        Carrito.deleteOne({'_id': idorden})
        .then(carrito =>{
        Carrito.find({'user_id': idusuario})
          .populate("orden.anuncio_id")
          .then(carrito =>{
            carrito.forEach(carro=>{
              costototal=costototal+carro.orden.subtotal
            })
            carrito.costototal=costototal
            res.render('detallecarrito',{carrito})
          })
          .catch(err =>{
            console.log(err)
          })
        })
        .catch(err =>{
          console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
});

//Rutas Compras
/*GET compras*/

authRoutes.get('/compradatosenvio/:idcompra', ensureLogin.ensureLoggedIn(),(req, res, next) =>{
  let idcompra = req.params.idcompra;
  res.render('compradatosenvio', { idcompra })
});

authRoutes.get('/compras', ensureLogin.ensureLoggedIn(),(req, res, next) =>{
  let idusuario = req.user._id;

  Compras.find({"user_id": idusuario})
  .populate({path: 'compra'})
  .exec(function(err,docs){
    var options = {
      path: "compra.anuncio",
      model: 'Anuncios'
    };

    if(err) return re.json(500);
    Compras.populate(docs,options,function(err, compras){
      console.log(compras)
    })
  })


  //res.render('detallecompras', { compras })
});

module.exports = authRoutes;
