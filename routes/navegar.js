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
  Subcategoria.find({'identificador_padre': idpadre})
    .then(subcategoria =>{
      Anuncios.find({$or: [ {'categoria': idpadre},{'subcategoria_padre': idpadre},{'subcategoria': idpadre} ]})
        .populate("tienda_id")
        .then(anuncios =>{
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
