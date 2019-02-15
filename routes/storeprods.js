const express = require('express');
const multer = require("multer");
const Tienda = require('../models/Tienda')
const Usuario = require('../models/Usuario')
const Anuncios = require('../models/Anuncios')
const Compras = require('../models/Compras')
const Carrito = require('../models/Carrito')
const upload = multer({dest: "./public/uploads"})

const router  = express.Router();

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
      .catch(err=>{
        console.log(err);
        res.render("altatienda")});
    })
    .catch(err=>{
      console.log(err);
      res.render("altatienda")});
  })
  .catch(err=>{
    console.log(err);
    res.render("altatienda")});
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


/*POST comprar*/
router.post("/comprar/:iduser/:costototal", (req, res, next)=>{
  let iduser = req.params.iduser;
  let compra = [];
  let costototal = req.params.costototal;
  Carrito.find({"user_id": iduser})
  .then(carrito=>{
    carrito.forEach(carrito=>{
      let orden = {anuncio  : carrito.orden.anuncio_id,
                   cantidad : carrito.orden.cantidad,
                   subtotal : carrito.orden.subtotal
      }

      compra.push(orden)
    })

    console.log(compra)
    const newCompra = new Compras({
      user_id     : iduser,
      compra      : compra,
      envio       : {},
      costototal  : costototal
    });

    newCompra.save()
    .then(comprasave=>{
      res.redirect(`/compradatosenvio/${comprasave._id}`)
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
})

router.post("/compra/update/:idcompra", (req, res, next)=>{
  let iduser = req.user._id;
  let idcompra = req.params.idcompra;
  console.log(req.body)
  let envio = {calle  : req.body.calle,
               colonia : req.body.colonia,
               municipio : req.body.municipio,
               estado : req.body.estado,
               postal : req.body.postal,
               referencia1 : req.body.referencia1,
               referencia2 : req.body.referencia2,
               entrecalle1 : req.body.entrecalle1,
               entrecalle2 : req.body.entrecalle2
  }

  Compras.updateOne({"_id": idcompra},{$set:{envio: envio}})
  .then(compraupdate=>{
    Carrito.deleteMany({"user_id": iduser})
    .then(carritodelete=>{
      res.redirect("/perfil")
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err))
})

module.exports = router;
