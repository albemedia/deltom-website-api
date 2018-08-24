const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: { type: String, required: 'Url not provided' },
  description: { type: String },
  filename: { type: String, required: 'Needs a filename' },
  uploaded_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', ImageSchema);
