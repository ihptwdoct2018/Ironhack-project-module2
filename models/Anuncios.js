const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const anunSchema = new Schema({
  fotos: [String],
  titulo:  String,
  descripcion: String,
  precio: Number,
  Stock: Number,
  especificaciones: String,
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

const Anuncios = mongoose.model('Anuncios', anunSchema);
module.exports = Anuncios;
