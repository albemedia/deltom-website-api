const mongoose = require('mongoose');

const { Schema } = mongoose;

const JumbotronSchema = new Schema({
  title: { type: String, required: 'Debes introducir un título' },
  subtitle: { type: String },
  redirectTo: { type: String, required: 'Debes especificar un link' },
  image: { type: Schema.Types.ObjectId, ref: 'Image' },
});

module.exports = mongoose.model('Jumbotron', JumbotronSchema);
