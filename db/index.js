//------------------------------------------------------------------------------
// Set up and connect to the database
//------------------------------------------------------------------------------

const dbParams = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    };

const { Pool } = require('pg');

const db = new Pool(dbParams);

module.exports = db;

/**-----------------------------------------------------------------------------
 * Get all passwords to which a user has access
 * @param {String} user_id The id of the user.
 * @param {String} limit The maximum number of passwords to get.
 * @return {Promise<{}>} A promise to the password list.
 */

// const getAllPasswords = (user_id, limit = 10) =>
//   db
//     .query(`SELECT * FROM passwords;`)
//     .then((res) => res.rows || null)
//     .catch((err) => console.error('query error', err.stack));

// exports.getAllPasswords = getAllPasswords;
