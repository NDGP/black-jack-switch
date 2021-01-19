const pg = require('pg');
require('dotenv').config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable` ;

const client = new pg.Client({
    connectionString: connectionString || process.env.DATABASE_URL,
});

console.log( `Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}` );
client.connect();

// client.query('SELECT * FROM users', (err, res) => {
//     console.log(err ? err.stack : res.rows) // Testing db query from back-end!
//     client.end()
//   })

module.exports = client;