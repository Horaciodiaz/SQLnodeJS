const { Pool } = require('pg');

const { Config } = require('../config/index')

const postgresConfig = {
  user: 'postgres',
  host: Config.host,
  database: Config.database,
  password: Config.password,
  port: Config.portsql,
};
module.exports.pool = new Pool(postgresConfig);