const Highlight = require('../../models/Highlight');
const About = require('../../models/About');
const Company = require('../../models/Company');
const Jumbotron = require('../../models/Jumbotron');

class WebsiteController {
  getHighlights(req, res) {
    Highlight.find().then((highlights) => {
      res.send({ highlights });
    });

    return this;
  }

  getAll(req, res) {
    Promise.all([
      About.find().select('resume mission vision -_id'),
      Company.find().select('name address contact -_id'),
      Highlight.find().populate({ path: 'image', select: 'filename' }),
      Jumbotron.find(),
    ])
      .then((result) => {
        const data = {
          about: result[0],
          company: result[1],
          highlights: result[2],
          jumbotrons: result[3],
        };
        res.send(data);
      })
      .catch((error) => {
        res.send(`ERROR: ${error.message}`);
      });

    return this;
  }
}

module.exports = new WebsiteController();
