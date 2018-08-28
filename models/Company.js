const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: 'Debes introducir un nombre' },
  address: {
    street: { type: String, required: true },
    streetnumber: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: String },
  },
});

module.exports = mongoose.model('Company', CompanySchema);
