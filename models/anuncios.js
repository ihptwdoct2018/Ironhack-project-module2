const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const anunSchema = new Schema({
  fotes: [String],
  titulo:  String,
  descripcion: String,
  precio: Number,
  Stock: Number,
  categoria: String,
  categoria_padre: String,
  subcategoria: String,
  tienda: {type: String},
  envio: {
    origen: String,
    tiempo: Number,
    gastos_envio: Number,
    transporte: String
  },
  calificacion: Number,
  comentarios:[String]
});

const Anuncio = mongoose.model('anuncios', anunSchema);
module.exports = Anuncio;


