const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const comentSchema = new Schema({
  user_id: {type: Schema.ObjectId, ref: "Usuario"},
  comenario: String,
  calificacion: Number,
  respuesta: String
});

const Comentarios = mongoose.model('Comentarios', comentSchema);
module.exports = Comentarios;
