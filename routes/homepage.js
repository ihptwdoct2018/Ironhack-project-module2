const express = require('express');
const Categoria = require('../models/Categoria')
const router  = express.Router();

/* GET home page */
router.get('/homepage/cat', (req, res, next) => {
  Categoria.find()
    .then(categoria =>{
      console.log(categoria);
      res.render('homepage', {categoria})
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = router;
