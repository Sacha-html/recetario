const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // tu usuario de MySQL
  password: 'M85p0si1m1$$',       // tu contraseña
  database: 'recetario',
});

module.exports = pool;