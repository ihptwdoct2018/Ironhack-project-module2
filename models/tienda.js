const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tiendaSchema = new Schema({
  pais: String,
  divisa: String,
  nombre: String,
  anuncios: [{type: String}],
  foto: String,
  user_id: {type:String},  
});

const Tienda = mongoose.model('tienda', tiendaSchema);
module.exports = Tienda;

