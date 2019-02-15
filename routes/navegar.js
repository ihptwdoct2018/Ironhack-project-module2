const express = require('express');
const Categoria = require('../models/Categoria')
const Subcategoria = require('../models/Subcategoria')
const Anuncios = require('../models/Anuncios')
const Tienda = require('../models/Tienda')

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('homepage')
});

router.get('/cat/:idpadre', (req, res, next) => {
  let idpadre = req.params.idpadre;
  let usuario = req.user;
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
});

module.exports = router;
