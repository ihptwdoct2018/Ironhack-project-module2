// models/user.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  tiendas: [{type: Schema.ObjectId, ref: "Tienda"}],
  categorias: [{type: Schema.ObjectId, ref: "Categoria"}],
  compras: [{type: Schema.ObjectId, ref: "Compra"}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
