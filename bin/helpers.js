//------------------------------------------------------------------------------
// helpers.js
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Error codes and messages

const statusCodeMessages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Method not allowed',
  500: 'Internal Server Error',
};

/**
 * Send an error object in return to a request.
 *
 * @param {number} code The status code to send back.
 * @param {string} message A message describing the issue.
 * @param {object} req The request.
 * @param {object} res The response.
 * @return A function taking an error in and sending a JSON object back.
 */

const sendError = (code, message) => (req, res) => (error) =>
  res.status(code).json({
    method: req.method,
    action: req.originalUrl,
    code: code,
    status: statusCodeMessages[code],
    message,
    error,
  });

const queryFailed = sendError(500, 'Database failed to process query');

//------------------------------------------------------------------------------
// Database and queries

// Return comma separated list of fields: 'id, name, ...'
const queryFields = (props) => props.join(', ');

// Return comma separated list of tokens: '$1, $2, ...'
const queryTokens = (props) =>
  props.map((_, index) => `$${index + 1}`).join(', ');

// Return comma separated list of fields and tokens: 'id = $1, name = $2, ...'
const queryFieldValuePairs = (props) =>
  props.map((prop, index) => `${prop} = $${index + 1}`).join(', ');

// Return array of query parameters: [id, name, ...]
const queryParams = (data, props) => props.map((prop) => data[prop]);

//------------------------------------------------------------------------------
// Exports

module.exports = {
  queryFailed,
  queryFields,
  queryTokens,
  queryFieldValuePairs,
  queryParams,
};
