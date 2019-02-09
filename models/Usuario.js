const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  usuario: String,
  password: String,
  tiendas: [{type: Schema.ObjectId, ref: "Tienda"}],
  categorias: [{type: Schema.ObjectId, ref: "Categoria"}],
  compras: [{type: Schema.ObjectId, ref: "Compra"}]
});

const Usuario = mongoose.model('Usuario', userSchema);
module.exports = Usuario;
