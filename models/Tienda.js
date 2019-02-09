const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tiendaSchema = new Schema({
  pais: String,
  divisa: String,
  nombre: String,
  anuncios: [{type: Schema.ObjectId, ref: "Anuncio"}],
  foto: {
    name: String,
    path: String,
    originalName: String
  },
  activo: Boolean,
  user_id: {type: Schema.ObjectId, ref: "Usuario"}
});

const Tienda = mongoose.model('Tienda', tiendaSchema);
module.exports = Tienda;
