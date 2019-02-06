const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  usuario: String,
  password: String,
  tiendas: [ {type: String} ],
  categorias: [{type: String}],
  compras: [{type: String}]  
});

const Usuario = mongoose.model('Usuario', userSchema);
module.exports = Usuario;
