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
  // GET /api/users/filters => User information

  router.get('/filters', (req, res) => {
    const user_id = req.session.user_id;
    const { id } = req.query;

    // Query list of organisations
    const queryOrgs = `
      SELECT DISTINCT orgs.id AS org_id, org_name, org_icon
      FROM users
      JOIN orgs_users ON users.id = orgs_users.user_id
      JOIN orgs ON orgs.id = orgs_users.org_id
      WHERE users.id = $1
      ORDER BY org_name;`;

    // Query list of categories
    const queryCategories = `
      SELECT DISTINCT categories.id AS cat_id, cat_name, cat_icon
      FROM users
      JOIN orgs_users ON users.id = orgs_users.user_id
      JOIN orgs ON orgs.id = orgs_users.org_id
      JOIN passwords ON orgs.id = passwords.org_id
      JOIN categories ON categories.id = passwords.category_id
      WHERE users.id = $1
      ORDER BY cat_name;`;

    if (id) {
      // Get organisations, categories and password
      const queryPassword = `SELECT * FROM passwords WHERE id = $1;`;

      Promise.all([
        db.query(queryOrgs, [user_id]),
        db.query(queryCategories, [user_id]),
        db.query(queryPassword, [id]),
      ])
        .then(([{ rows: orgs }, { rows: categories }, { rows: passwords }]) =>
          res.json({ orgs, categories, passwords })
        )
        .catch(queryFailed(req, res));

      // Get only organisations and categories
    } else {
      Promise.all([
        db.query(queryOrgs, [user_id]),
        db.query(queryCategories, [user_id]),
      ])
        .then(([{ rows: orgs }, { rows: categories }]) =>
          res.json({ orgs, categories })
        )
        .catch(queryFailed(req, res));
    }
  });

  return router;
};
