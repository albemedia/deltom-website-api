const fs = require('fs');
const path = require('path');
const uploader = require('../lib/uploader');
const Image = require('../models/Image');

class WebImagesController {
  upload(req, res) {
    const upload = uploader('websiteImages', 2000000, '').single('file');
    upload(req, res, (err) => {
      if (err) {
        res.send(err);
      } else if (typeof req.file === 'undefined') {
        res.send('No File Selected');
      } else {
        Image.create({
          url: req.file.destination.slice(1),
          description: req.body.description,
          filename: req.file.filename,
        })
          .then(() => {
            res.redirect('/admin/gallery');
          })
          .catch((error) => {
            res.send(error.message);
          });
      }
    });
    return this;
  }

  showUploadForm(req, res) {
    Image.find().then(() => {
      res.render('upload', { currentPage: 'gallery' });
    });
    return this;
  }

  showGallery(req, res) {
    Image.find().then((result) => {
      res.render('gallery', { images: result, currentPage: 'gallery' });
    });
    return this;
  }

  deleteImage(req, res) {
    Image.findOne({ _id: req.params.Id })
      .then((result) => {
        fs.unlink(path.join(__dirname, `..${result.url}${result.filename}`), (err) => {
          if (err) {
            res.send(err);
          } else {
            Image.remove({ _id: result.id }).then(() => {
              res.redirect('/admin/gallery');
            });
          }
        });
      })
      .catch((error) => {
        res.send(error.message);
      });
    return this;
  }
}

module.exports = new WebImagesController();
