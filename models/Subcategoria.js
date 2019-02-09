const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const subcatSchema = new Schema({
  subcategoria: String,
  foto:  String,
  identificador: String,
  identificador_padre: String,
  nivel: Number,
  final: Boolean,
  niveles_inferiores: Number,
  anuncios: [{type: Schema.ObjectId, ref: "Anuncio"}]
});

const Subcategoria = mongoose.model('Subcategoria', subcatSchema);
module.exports = Subcategoria;
