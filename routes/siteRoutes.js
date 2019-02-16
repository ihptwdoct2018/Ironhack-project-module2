const express = require("express");
const siteRoutes = express.Router();
const Anuncios = require('../models/Anuncios')

console.log("entrando por siteroutes")

siteRoutes.get("/",(req,res,next)=>{
  res.render("homepage");
})

siteRoutes.get("/404",(req,res,next)=>{
  res.render("auth/404");
})

siteRoutes.get("/home",(req,res)=>{
  if(req.user !== null && req.user!== undefined)
    res.redirect('/userhome')
  else {
    res.render("homepage")
  }
})

siteRoutes.get("/buscaproducto", (req, res, next) =>{
  if(req.user !== null && req.user!== undefined){
    let tituloprod = req.query.producto;
    console.log(tituloprod)
    let usuario = req.user;
    Anuncios.find({titulo: { $regex: '.*' + tituloprod + '.*', $options: 'i'  } })
    .populate("tienda_id")
    .then(anuncios =>{
      anuncios.forEach(anuncio=>anuncio.idpadrecarrito=anuncio.categoria)
      res.render('subcategoria', {anuncios, usuario})
    })
    .catch(err=>console.log(err))
  }
  else{
    let tituloprod = req.query.producto;
    console.log(tituloprod)
    Anuncios.find({titulo: { $regex: '.*' + tituloprod + '.*', $options: 'i'  } })
    .populate("tienda_id")
    .then(anuncios =>{
      anuncios.forEach(anuncio=>anuncio.idpadrecarrito=anuncio.categoria)
      res.render('subcategoria', {anuncios})
    })
    .catch(err=>console.log(err))
  }


});

module.exports=siteRoutes;
