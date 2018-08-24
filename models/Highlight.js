const mongoose = require('mongoose');

const { Schema } = mongoose;

const HighlightSchema = new Schema({
  title: { type: String, required: 'Debes introducir un título' },
  description: { type: String },
  redirectTo: { type: String, required: 'Debes especificar un link' },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
});

module.exports = mongoose.model('Highlight', HighlightSchema);
