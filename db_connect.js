require('dotenv').config();
const PgConnection = require('postgresql-easy');
let dbConfig = require('./config/db');
// dbConfig.password = process.env.DB_PASSWORD;
const pg = new PgConnection(dbConfig);

module.exports = pg;
