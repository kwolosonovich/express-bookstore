/** Common config for bookstore. */


// let DB_URI = `postgresql://`;


// if (process.env.NODE_ENV === "test") {
//   DB_URI = `${DB_URI}/books-test`;
// } else {
//   DB_URI = process.env.DATABASE_URL || `${DB_URI}/books`;
// }


// module.exports = { DB_URI };

require("dotenv").config();

let data;

if (process.env.NODE_ENV === "test") {
  data = "books-test";
} else {
  data = "books";
}


module.exports = { data };