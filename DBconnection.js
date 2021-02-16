const mysql = require("mysql2");
const config = require("./config");


const poolConnection = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  });
};

module.exports = {poolConnection : poolConnection};