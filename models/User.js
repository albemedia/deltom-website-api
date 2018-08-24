const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Se requiere de una direccion de email.',
    unique: 'Ya existe en la base de datos',
  },
  password: { type: String, required: 'Se requiere de una contraseña' },
  role: { type: String },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
