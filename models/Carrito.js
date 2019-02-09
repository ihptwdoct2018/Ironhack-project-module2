const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const carritoSchema = new Schema({
  orden: [{
    user_id: {type: Schema.ObjectId, ref: "Usuario"},
    anuncio_id: {type: Schema.ObjectId, ref: "Anuncio"},
    cantidad: Number,
    subtotal: Number
  }],
  costototal: Number
});

const Carrito = mongoose.model('Carrito', cartSchema);
module.exports = Carrito;
