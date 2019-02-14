const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const carritoSchema = new Schema({
  user_id: {type: Schema.ObjectId, ref: "Usuario"},
  orden: {
    anuncio_id: {type: Schema.ObjectId, ref: "Anuncios"},
    cantidad: Number,
    subtotal: Number
  }
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;
