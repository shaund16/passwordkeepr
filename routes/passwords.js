//------------------------------------------------------------------------------
// Create router for password ressources
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
  // GET /api/passwords => Browse

  router.get('/', (req, res) => {
    const user_id = req.session.user_id;

    console.log('>>>>', req.query);

    // List of passwords
    db.query(
      `SELECT passwords.*, org_name, category
        FROM users
        JOIN orgs_users ON users.id = orgs_users.user_id
        JOIN orgs ON orgs.id = orgs_users.org_id
        JOIN passwords ON orgs.id = passwords.org_id
        JOIN categories ON categories.id = passwords.category_id
        WHERE users.id = $1
        ORDER BY org_name, site_name;`,
      [user_id]
    )
      .then((passwords) => {
        res.json({ passwords: passwords.rows });
      })
      .catch(queryFailed(req, res));
  });

  //----------------------------------------------------------------------------
  // GET /api/passwords/id => Read

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM passwords WHERE id = $1;', [id])
      .then((data) => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(queryFailed(req, res));
  });

  //----------------------------------------------------------------------------
  // PUT /api/passwords/id => Edit

  router.put('/:id', (req, res) => {
    // Set query fields
    const props = [
      'org_id',
      'site_name',
      'site_url',
      'site_login',
      'site_pwd',
      'category',
    ];

    // Prepare query data
    const params = queryParams(req.body, props);
    params.push(req.params.id); // push password id

    // Send query
    db.query(
      `UPDATE passwords
      SET ${queryFieldValuePairs(props)}
      WHERE id = $${params.length + 1}
      RETURNING *;`,
      params
    )
      .then((data) => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(queryFailed(req, res));
  });

  //----------------------------------------------------------------------------
  // POST /api/passwords => Add

  router.post('/', (req, res) => {
    // Set query fields
    const props = [
      'org_id',
      'creator_id',
      'site_name',
      'site_url',
      'site_login',
      'site_pwd',
      'category',
      'date_created',
    ];

    // Prepare query data
    const user_id = req.session.user_id;
    const data = {
      ...req.body,
      creator_id: user_id,
      date_created: new Date(),
    };

    // Send query
    db.query(
      `INSERT INTO passwords (${queryFields(props)})
      VALUES (${queryTokens(props)})
      RETURNING *;`,
      queryParams(data, props)
    )
      .then((data) => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(queryFailed(req, res));
  });

  //----------------------------------------------------------------------------
  // DELETE /api/passwords/id => Delete

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM passwords WHERE id = $1 RETURNING *;', [id])
      .then((data) => res.json({ deleted: data.rows }))
      .catch(queryFailed(req, res));
  });

  return router;
};
