//------------------------------------------------------------------------------
// Create router for users
//------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------
// Helpers

const {
  queryFailed,
  queryFields,
  queryTokens,
  queryFieldValuePairs,
  queryParams,
} = require('../bin/helpers');

module.exports = (db) => {
  //----------------------------------------------------------------------------
  // GET /api/users => User information

  router.get('/filters', (req, res) => {
    const user_id = req.session.user_id;

    Promise.all([
      // List of organisations
      db.query(
        `SELECT DISTINCT orgs.id AS org_id, org_name
        FROM users
        JOIN orgs_users ON users.id = orgs_users.user_id
        JOIN orgs ON orgs.id = orgs_users.org_id
        WHERE users.id = $1
        ORDER BY org_name;`,
        [user_id]
      ),
      // List of categories
      db.query(
        `SELECT DISTINCT categories.id AS cat_id, category
        FROM users
        JOIN orgs_users ON users.id = orgs_users.user_id
        JOIN orgs ON orgs.id = orgs_users.org_id
        JOIN passwords ON orgs.id = passwords.org_id
        JOIN categories ON categories.id = passwords.category_id
        WHERE users.id = $1
        ORDER BY category;`,
        [user_id]
      ),
    ])
      .then(([orgs, categories]) =>
        res.json({ orgs: orgs.rows, categories: categories.rows })
      )
      .catch(queryFailed(req, res));
  });

  return router;
};
