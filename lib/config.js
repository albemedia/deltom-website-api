const User = require('../models/User');
const Company = require('../models/Company');
const About = require('../models/About');

const config = {
  initialize() {
    this.createAdmin();
    this.createCompany();
    this.createAbout();
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

  createAbout() {
    About.find()
      .then((about) => {
        if (about === null || about.length < 1) {
          About.create({
            resume: 'Resume',
            mission: 'Mission',
            vision: 'Vision',
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
