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

// Log server
const morgan = require('morgan');
app.use(morgan('dev'));

// Pre-process CSS
const sass = require('node-sass-middleware');
const sassOptions = {
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded',
};
app.use('/styles', sass(sassOptions));

// Parse body
app.use(express.urlencoded({ extended: false }));

// Encrypt session cookies
const cookieSession = require('cookie-session');
app.use(cookieSession({ name: 'session', keys: ['noema', 'noesis', 'sator'] }));

// Method overriding for REST API
// app.use((req, res, next) => {
//   if (req.query._method) {
//     req.method = req.query._method;
//   }
//   next();
// });

// Serve static files
app.use(express.static('public')); // <== Home page

//------------------------------------------------------------------------------
// Create a separate router for each ressource

const usersRoutes = require('./routes/users');
const passwordsRoutes = require('./routes/passwords');

//------------------------------------------------------------------------------
// Mount all ressource routers

app.use('/api', usersRoutes(db));
app.use('/api/passwords', passwordsRoutes(db));

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
