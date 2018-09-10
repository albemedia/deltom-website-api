const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {
  init() {
    mongoose
      .connect(
        'mongodb://localhost:27017/deltomWebAdmin',
        { useNewUrlParser: true },
      )
      .then(() => {
        console.log('Connection Succesful to database');
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  },
};

module.exports = db;
