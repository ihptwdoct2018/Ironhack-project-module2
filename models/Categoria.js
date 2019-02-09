const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const catSchema = new Schema({
  categoria:  String,
  foto:  String,
  identificador: String ,
  niveles_inf: Number
});

const Categoria = mongoose.model('Categoria', catSchema);
module.exports = Categoria;
