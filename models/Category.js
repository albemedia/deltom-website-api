const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: 'Should specify a Name' },
  representativeImage: { type: Schema.Types.ObjectId, ref: 'Image' },
});

CategorySchema.methods.getName = (id) => {
  let name = '';
  this.findOne({ _id: id }).then((category) => {
    name = category.name;
  });
  return name;
};

module.exports = mongoose.model('Category', CategorySchema);
