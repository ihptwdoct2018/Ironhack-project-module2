const express = require('express');
const multer = require("multer");
const Tienda = require('../models/Tienda')
const Usuario = require('../models/Usuario')
const Anuncios = require('../models/Anuncios')
const upload = multer({dest: "./public/uploads"})

const router  = express.Router();

/*GET Tienda*/


/*router.get('/detalletienda/:idtienda', (req, res, next) => {
  let idtienda = req.params.idtienda;
  res.render('detalletienda',{idtienda})
});*/

/*router.get('/administrartienda', (req, res, next) => {
  Tienda.find()
    .then(tiendas =>{
      console.log(tiendas);
      res.render('administrartienda', {tiendas})
    })
    .catch(err =>{
      console.log(err)
    })
});*/

/*router.get('/altatienda', (req, res, next) => {
  res.render('altatienda')
});*/

/*router.get('/altaproductos:idtienda', (req, res, next) => {
  res.render('altaproductos')
});
*/
/* POST Tienda */
router.post("/administrartienda/altatienda/add", upload.single("photo"), (req, res, next)=>{
  const newTienda = new Tienda({
    pais          : req.body.pais,
    divisa        : req.body.divisa,
    nombre        : req.body.nombre,
    anuncios      : [],
    foto          : {
      name         : req.body.nombre,
      path         : `/uploads/${req.file.filename}`,
      originalName : req.file.originalname
    },
    user_id       : req.user._id
  });
  newTienda.save()
  .then((tienda)=>{
    Usuario.find({_id:req.user._id})
    .then((usuario)=>{
      Usuario.updateOne({_id:req.user._id},{$push:{tiendas: tienda._id}})
      .then((usuarioupdate)=>{
        res.redirect(301,"/administrartienda")
      })
      .catch(err=>res.render("altatienda"));
    })
    .catch(err=>res.render("altatienda"));
  })
  .catch(err=>res.render("altatienda"));
})


/*POST alta productos*/
router.post("/administrartienda/altaproductos/add", upload.single("photo"), (req,res)=>{
  let idtienda=req.body.tienda_id;
  const newAnuncio = new Anuncios({
    foto           : {
      name         : req.body.titulo,
      path         : `/uploads/${req.file.filename}`,
      originalName : req.file.originalname
    },
    titulo         : req.body.titulo,
    descripcion    : req.body.descripcion,
    precio         : req.body.precio,
    stock          : req.body.stock,
    categoria      : req.body.categoria,
    subcategoria_padre : req.body.subcategoria_padre,
    subcategoria   : req.body.subcategoria,
    tienda_id      : req.body.tienda_id,
    envio          :{
      origen       : req.body.origen,
      tiempo       : req.body.tiempo,
      gastosenvio  : req.body.gastosenvio,
      transporte   : req.body.transporte
    },
    calificacion   : 0,
    comentarios    :[],
    megusta        : 0
  });
  newAnuncio.save()
  .then((anuncio)=>{
    res.redirect(301,`/detalletienda/${idtienda}`)
  })
  .catch(err=>{
    console.log(err)
    res.redirect(`/altaproductos/${idtienda}`)});
})

module.exports = router;
