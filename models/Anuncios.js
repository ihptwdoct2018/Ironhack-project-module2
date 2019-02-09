const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const anunSchema = new Schema({
  fotos: [String],
  titulo:  String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoria: String,
  subcategoria_padre: String,
  subcategoria: String,
  tienda_id: {type: Schema.ObjectId, ref: "Tienda"},
  envio: {
    origen: String,
    tiempo: Number,
    gastosenvio: Number,
    transporte: String
  },
  calificacion: Number,
  comentarios:[{type: Schema.ObjectId, ref: "Comentarios"}],
  megusta: Number,
  activo: Boolean
});

const Anuncios = mongoose.model('Anuncios', anunSchema);
module.exports = Anuncios;
