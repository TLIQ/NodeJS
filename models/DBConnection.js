const mysql = require("mysql2");
const config = require("../config/config");

const poolConnection = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  });
};

const connection = {
  poolConnection: poolConnection().promise(),
};

module.exports = connection;
