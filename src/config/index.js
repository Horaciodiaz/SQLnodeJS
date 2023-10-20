const dotenv = require('dotenv');
dotenv.config();

module.exports.Config = {
    port: process.env.PORT,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database,
    portsql: process.env.PORTSQL
}