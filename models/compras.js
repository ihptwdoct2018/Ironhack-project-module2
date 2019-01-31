const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const compraSchema = new Schema({
  compra:[{
    user_id: {type : String},
    anuncio: {type : String},
    cantidad: Number,
    subtotal: Number,
  }], 
  envio: [{
    calle: String,
    colonia: String,
    delegacion: String,
    estado: String,
    postal: Number,
    referencia: String,
    entre_calles: String,    
  }],
  total: Number,
});

const Compra = mongoose.model('compras', compraSchema);
module.exports = Compra;


