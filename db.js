/** Database config for database. */


// const { Client } = require("pg");
// const {DB_URI} = require("./config");

// let db = new Client({
//   connectionString: DB_URI
// });

// db.connect();


// module.exports = db;



const { Client } = require("pg");
const { data } = require("./config");

const client = new Client(data);

client.connect();

module.exports = client;
