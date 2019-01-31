const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const comentSchema = new Schema({
  nombre:    { type: String },
  comenarios: [String],
  calificacion: Number,
  respuesta: String,
});

const Comentario = mongoose.model('comentarios', comentSchema);
module.exports = Comentario;


