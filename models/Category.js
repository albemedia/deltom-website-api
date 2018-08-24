const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: 'Should specify a Name' },
  representativeImage: { type: Schema.Types.ObjectId, ref: 'Image' },
});

module.exports = mongoose.model('Category', CategorySchema);
