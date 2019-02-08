const express = require('express');
const Categoria = require('../models/Categoria')
const Subcategoria = require('../models/Subcategoria')
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('homepage')
});

router.get('/cat/:idpadre', (req, res, next) => {
  let idpadre = req.params.idpadre;
  Subcategoria.find({'identificador_padre': idpadre})
    .then(subcategoria =>{
      let prueba = {user: "user1",
                    psw: "psw1"}
      console.log(prueba.user);
      res.render('subcategoria', {subcategoria,prueba})
    })
    .catch(err =>{
      console.log(err)
    })
});

module.exports = router;
