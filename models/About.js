const mongoose = require('mongoose');

const { Schema } = mongoose;

const AboutSchema = new Schema({
  resume: { type: String, required: 'Debes introducir un resumen' },
  mission: { type: String, required: 'Debes introducir una mision' },
  vision: { type: String, required: 'Debes introducir una vision' },
});

module.exports = mongoose.model('About', AboutSchema);
