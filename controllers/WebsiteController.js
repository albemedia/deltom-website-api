const Highlight = require('../models/Highlight');

//  Specific Functions
const opts = {
  highlights: {
    store: (req, res) => {
      Highlight.create({
        title: req.body.title,
        description: req.body.description,
        redirectTo: req.body.redirectTo,
        image: req.body.imagePicked,
      })
        .then(() => {
          res.send('Created');
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    apiShow: (req, res) => {
      Highlight.find()
        .populate({ path: 'image', select: 'url description filename -_id' })
        .then((highlights) => {
          res.send(highlights);
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    show: (req, res) => {
      Highlight.find()
        .populate({ path: 'image', select: 'url description filename -_id' })
        .then((highlights) => {
          res.render('highlight', { highlights });
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    create: (req, res) => {
      res.render('highlight-create', {
        images: req.images,
        scriptFile: 'imageSelect',
        currentPage: 'website',
      });
    },
    edit: (req, res) => {
      Highlight.find({ _id: req.params.Id })
        .populate({ path: 'image', select: 'url description filename -_id' })
        .then((highlights) => {
          const fields = {
            title: highlights[0].title,
            description: highlights[0].description,
            redirectTo: highlights[0].redirectTo,
            image: highlights[0].image,
            filename: highlights[0].image.filename,
          };
          res.render('highlight-create', {
            images: req.images,
            scriptFile: 'imageSelect',
            currentPage: 'website',
            fields,
          });
        });
    },
  },
};

class WebsiteController {
  constructor(options) {
    this.highlights = options.highlights;
  }

  show(req, res) {
    res.render('website-config');
    return this;
  }
}

module.exports = new WebsiteController(opts);
