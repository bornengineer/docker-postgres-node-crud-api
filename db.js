const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: "5432",
  user: "mak",
  password: "postgres",
  database: "school_db",
});

module.exports = pool;
