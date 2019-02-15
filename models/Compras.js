const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const compraSchema = new Schema({
  user_id: {type: Schema.ObjectId, ref: "Usuario"},
  compra:[{
    anuncio: {type: Schema.ObjectId, ref: "Anuncios"},
    cantidad: Number,
    subtotal: Number
  }],
  envio: {
    calle: String,
    colonia: String,
    municipio: String,
    estado: String,
    postal: Number,
    referencia1: String,
    referencia2: String,
    entrecalle1: String,
    entrecalle2: String
  },
  costototal: Number,
  estatus : String
});

const Compra = mongoose.model('Compra', compraSchema);
module.exports = Compra;
