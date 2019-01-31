const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema({
  nombre:    { type: String },
  //foto:  String,
  identificador: String ,
  niveles_inferiores: Number,
});

const Categoria = mongoose.model('categoria', catSchema);
module.exports = Categoria;
