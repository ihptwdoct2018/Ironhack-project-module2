const express = require('express');
const Categoria = require('../models/Categoria')
const Subcategoria = require('../models/Subcategoria')
const Anuncios = require('../models/Anuncios')
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  Categoria.find()
    .then(categoria =>{
      res.render('homepage', {categoria})
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = router;
