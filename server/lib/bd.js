/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();

// Import lib mysql2:
const mysql = require("mysql2");

/* Connection Mysql >> Create the connection pool, 
Pool is our méthode, we can use other methodes( for example connection):*/

const pool = mysql.createPool({
  host: process.env.HOST,
  user: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = pool;
