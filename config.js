/** Common config for bookstore. */

require("dotenv").config();

let data;

if (process.env.NODE_ENV === "test") {
  data = "books-tests";
} else {
  data = "books";
}


module.exports = { data };