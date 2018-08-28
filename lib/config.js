const User = require('../models/User');
const Company = require('../models/Company');

const config = {
  initialize() {
    this.createAdmin();
    this.createCompany();
  },

  createAdmin() {
    User.findOne({ role: 'admin' })
      .then((user) => {
        if (user === null || user.length < 1) {
          User.create({
            email: 'albemedia.jesus@gmail.com',
            password: '123456',
            role: 'admin',
          })
            .then(() => true)
            .catch(() => this);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  createCompany() {
    Company.find()
      .then((company) => {
        if (company === null || company.length < 1) {
          Company.create({
            name: 'Example Company',
            address: {
              street: 'Example Street',
              streetnumber: 2525,
              city: 'Example City',
              state: 'Example State',
              country: 'Country',
            },
            contact: {
              email: 'example@company.com',
              phone: '+1 555 1245-123',
            },
          })
            .then(() => true)
            .catch(() => this);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
};

module.exports = config;
