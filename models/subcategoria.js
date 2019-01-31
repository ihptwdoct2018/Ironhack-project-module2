const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const subcatSchema = new Schema({
  nombre:    { type: String },
  foto:  String,
  identificador: String,
  identificador_padre: String,
  nivel: Number,
  final: Boolean,
  niveles_inferiores: Number,
  anuncios: [String]
});

const subcategoria = mongoose.model('subcategoria', subcatSchema);
module.exports = subcategoria;


