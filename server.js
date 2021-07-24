//------------------------------------------------------------------------------
// server.js
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Load .env data into process.env

require('dotenv').config();

//------------------------------------------------------------------------------
// Constants

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';

//------------------------------------------------------------------------------
// Set up and connect database

const db = require('./db');

//------------------------------------------------------------------------------
// Create and initialize server

const express = require('express');
const app = express();
app.set('view engine', 'ejs');

//------------------------------------------------------------------------------
// Use middleware

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
// Deprecated:
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));

const sass = require('node-sass-middleware');
const sassOptions = {
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded',
};
app.use('/styles', sass(sassOptions));

app.use(express.static('public')); // <== Home page

//------------------------------------------------------------------------------
// Create a separate router for each ressource

const usersRoutes = require('./routes/users');
const passwordRoutes = require('./routes/passwords');

//------------------------------------------------------------------------------
// Mount all ressource routers

app.use('/api/users', usersRoutes(db));
app.use('/api/passwords', passwordRoutes(db));

//------------------------------------------------------------------------------
// Render home page  <== Not used for SPA

// app.get('/', (req, res) => res.render('index'));

//------------------------------------------------------------------------------
// Start listening

app.listen(PORT, () =>
  console.log(`
-------------------------------------
PasswordKeepR listening on port ${PORT}
-------------------------------------`)
);
