const Highlight = require('../models/Highlight');
const Company = require('../models/Company');
const About = require('../models/About');
const Jumbotron = require('../models/Jumbotron');

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
    show: (req, res) => {
      Highlight.find()
        .populate({ path: 'image', select: 'url description filename -_id' })
        .then((highlights) => {
          res.render('highlights-list', {
            highlights,
            currentPage: 'website',
            subnavOption: 'highlights',
          });
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
            id: highlights[0].id,
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
        })
        .catch((error) => {
          res.send('Objeto no encontrado, ERROR: '.concat(error.message));
        });
    },
  },

  company: {
    edit: (req, res) => {
      Company.find()
        .then((company) => {
          const fields = {
            id: company[0].id,
            name: company[0].name,
            address: {
              street: company[0].address.street,
              streetnumber: company[0].address.streetnumber,
              city: company[0].address.city,
              state: company[0].address.state,
              country: company[0].address.country,
            },
            contact: {
              email: company[0].contact.email,
              phone: company[0].contact.phone,
            },
          };
          res.render('company-create', { currentPage: 'website', subnavOption: 'empresa', fields });
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    update: (req, res) => {
      Company.findOneAndUpdate(
        { _id: req.body.id },
        {
          name: req.body.name,
          address: {
            street: req.body.street,
            streetnumber: req.body.streetnumber,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
          },
          contact: {
            email: req.body.email,
            phone: req.body.phone,
          },
        },
        { runValidators: true },
        (err) => {
          if (err) {
            res.send(err.errors);
          } else {
            res.redirect('/admin/website/company');
          }
        },
      );
    },
  },

  about: {
    edit: (req, res) => {
      About.find()
        .then((about) => {
          const fields = {
            id: about[0].id,
            resume: about[0].resume,
            mission: about[0].mission,
            vision: about[0].vision,
          };
          res.render('about-create', { currentPage: 'website', subnavOption: 'nosotros', fields });
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    update: (req, res) => {
      About.findOneAndUpdate(
        { _id: req.body.id },
        {
          resume: req.body.resume,
          mission: req.body.mission,
          vision: req.body.vision,
        },
        { runValidators: true },
        (err) => {
          if (err) {
            res.send(err.errors);
          } else {
            res.redirect('/admin/website/about');
          }
        },
      );
    },
  },

  jumbotron: {
    create: (req, res) => {
      res.render('jumbotron-create', {
        images: req.images,
        scriptFile: 'imageSelect',
        currentPage: 'website',
      });
    },
    show: (req, res) => {
      Jumbotron.find()
        .populate({ path: 'image', select: 'url description filename -_id' })
        .then((jumbotrons) => {
          res.render('jumbotron-list', {
            jumbotrons,
            currentPage: 'website',
            subnavOption: 'jumbotron',
          });
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
    store: (req, res) => {
      Jumbotron.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        redirectTo: req.body.redirectTo,
        image: req.body.imagePicked,
      }).then(() => {
        res.redirect('/admin/website/jumbotron');
      });
    },
    delete: (req, res) => {
      Jumbotron.findOneAndRemove({ _id: req.params.Id })
        .then(() => {
          res.redirect('/admin/website/jumbotron');
        })
        .catch((error) => {
          res.send(error.message);
        });
    },
  },
};

class WebsiteController {
  constructor(options) {
    this.highlights = options.highlights;
    this.company = options.company;
    this.about = options.about;
    this.jumbotron = options.jumbotron;
  }

  show(req, res) {
    res.render('website-config');
    return this;
  }
}

module.exports = new WebsiteController(opts);
