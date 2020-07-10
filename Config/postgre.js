const { Pool } = require("pg");

// clients will use environment variables
// for connection information
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
