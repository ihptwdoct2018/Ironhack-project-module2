// models/user.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  tiendas: [ {type: String} ],
  categorias: [{type: String}],
  compras: [{type: String}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
