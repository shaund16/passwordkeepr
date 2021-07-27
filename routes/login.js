//------------------------------------------------------------------------------
// Create router for login, logout and registration
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //----------------------------------------------------------------------------
  // GET /login/id => Temporary shortcut for login

  router.get('/login/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });

  return router;
};
