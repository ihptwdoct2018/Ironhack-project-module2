const express = require('express');
const User = require('../models/Usuario')
const Categoria = require('../models/Categoria')
const Anuncios = require('../models/Anuncios')
const Tienda = require('../models/Tienda')
const Compras = require('../models/Compras')

const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('homepage')
});

module.exports = router;

