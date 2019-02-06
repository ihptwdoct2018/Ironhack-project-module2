const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cartSchema = new Schema({
  orden: [{type: String}],
  user_id: {type: String},
  anuncio_id: {type: String},
  cantidad: Number,
  subtotal: Number,
  total: Number,  
});

const Cart = mongoose.model('carrito', cartSchema);
module.exports = Cart;

