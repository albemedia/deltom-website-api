const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const uuid = require('uuid');
const auth = require('./lib/auth');
const db = require('./lib/database');
const ApiRouter = require('./routes/api');
const AdminRouter = require('./routes/admin');
const config = require('./lib/config');

const app = express();
//  Connect to Database
db.init();

//  Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    genid: () => uuid(),
    secret: 'keyboar cat w',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.static('./public'));

//  Auth Config
auth(app);

config.initialize();

//  View Engine
app.set('view engine', 'ejs');

const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

//  Routes
app.use('/api', ApiRouter);
app.use('/admin', AdminRouter);

app.get('/', requireAuth, (req, res) => {
  res.redirect('/admin/');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
  }),
);

if (app.listen(8000)) {
  console.log('Listening port 8000....');
}
