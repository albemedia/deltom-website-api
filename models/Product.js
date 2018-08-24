const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: 'Should specify a Name' },
  description: { type: String },
  category: {
    type: Schema.Types.ObjectId,
    required: 'Should have a category',
    ref: 'Category',
  },
  picture: { type: Schema.Types.ObjectId, ref: 'Image' },
  pictures: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Product', ProductSchema);
