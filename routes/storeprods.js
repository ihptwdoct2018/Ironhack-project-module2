const express = require('express');
const multer = require("multer");
const Anuncios = require('../models/Anuncios')
const Tienda = require('../models/Tienda')
const Picture = require('../models/picture');

const upload = multer({dest: "./public/uploads"})

const router  = express.Router();

/* GET home page */
router.get('/detalletienda', (req, res, next) => {
  Picture.find((err,pictures)=>{
    res.render("index",{pictures});
  });
});

router.get('/tienda/alta', (req, res, next) => {

});

router.post("/tienda/upload",upload.single("photo"), (req,res)=>{
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });
  pic.save(err=>{
    res.redirect("/");
  });
});

router.get('/administratienda', (req, res, next) => {
  let idpadre = req.params.idpadre;
  Subcategoria.find({'identificador_padre': idpadre})
    .then(subcategoria =>{
      Anuncios.find({$or: [ {'categoria': idpadre},{'subcategoria_padre': idpadre},{'subcategoria': idpadre} ]})
        .populate("tienda_id")
        .then(anuncios =>{
          console.log(anuncios)
          res.render('subcategoria', {subcategoria, anuncios})
        })
        .catch(err =>{
          console.log(err)
        })
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = router;
