//------------------------------------------------------------------------------
// Create router for users
//------------------------------------------------------------------------------

const express = require("express");
const router = express.Router();

module.exports = (db) => {

  //----------------------------------------------------------------------------
  // GET /api/login/id => Temporary shortcut for login

  router.get('/login/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  });




  return router;
};
