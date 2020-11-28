const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
//-----------------PASSPORTjs---------------------------//
const passport = require('passport');
const session = require('express-session')
//------------------------------------------------------//
require('./db.js');

const server = express();

server.use(cors({
  origin: "https://henry-comics.vercel.app/",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser('secretcode'));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//-----------------PASSPORTjs---------------------------//
server.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: false
  })
);

server.use(passport.initialize());
server.use(passport.session());
require("./middleware/passport-facebook")
require("./middleware/passport-google");
require("./middleware/passport-config");
//-----------------------------------------------------//
server.get('/', (req, res) => {
  res.status(200).send('Hello Heroku')
})

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
