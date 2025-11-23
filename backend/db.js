const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mar29032005',
  database: 'calendario'
});

module.exports = connection;
