const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'YOUR_DB_USER',
  password: 'YOUR_DB_PASSWORD',
  database: 'YOUR_DB_NAME'
})

module.exports = pool
