const User = require('../models/User');

const config = {
  initialize() {
    this.createAdmin();
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
};

module.exports = config;
