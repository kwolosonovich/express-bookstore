process.env.NODE_ENV = "test"

const request = require("supertest");
const { response } = require("../app");
const app = require("../app");
const db = require("../db");


// let test_book;

    
// clear test database before each test
beforeEach(async () => {
    await db.query("DELETE FROM books")
    await db.query(
        `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
            VALUES (
                1593279507, 
                'https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming/dp/1593279507/ref=sr_1_1?dchild=1&keywords=Eloquent+JavaScript%2C+3rd+Edition%3A+A+Modern+Introduction+to+Programming&qid=1599778305&sr=8-1',
                'Marijn Haverbeke',
                'english', 
                472, 
                'No Starch Press',
                'Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming',
                2018
            )`
    )

})

describe("GET /books", () => {
    test("get all books", async () => {
        let result = await request(app)
            .get("/books")
        expect(result.statusCode).toEqual(200)
        expect(result.body.books[0]).toHaveProperty("author")
        expect(result).toBeTruthy();
    })
});

describe("GET /books/:id", () => {
    test("get book by id", async () => {
        let result = await request(app).get("/books/1593279507");
        expect(result.statusCode).toEqual(200)
        expect(result.body).toHaveProperty("book")
        expect(result.body.book).toHaveProperty("author")
    })
    test("test invalid id", async () => {
        let result = await request(app).get("/books/123")
// ******* why is this not 400 *******
        expect(result.statusCode).toEqual(404)
    })
})

describe("POST /books", () => {
    test("add new book", async () => {
        let result = await request(app).post("/books").send({
          isbn: 1118008189,
          amazon_url:
            "https://www.amazon.com/gp/product/1118008189/ref=ppx_yo_dt_b_search_asin_image?ie=UTF8&psc=1",
          author: "Jon Duckett",
          language: "english",
          pages: 490,
          publisher: "John Wiley & Sons",
          title: "HTML and CSS: Design and Build Websites",
          year: 2011,
        });
        expect(result.statusCode).toEqual(201)
        expect(result.body).toHaveProperty("book");
        expect(result.body.book).toHaveProperty("author");
    })
    test("add invalid type", async () => {
        let result = await request(app).post("/").send(
            "not a book"
        )
        expect(result.statusCode).toEqual(404);
    })
})

describe("PUT /books/:id", () => {
    test("update book", async() => {
        let result = await request(app).put("/books/1593279507").send({
          amazon_url: "https://www.amazon.com/newurl",
          author: "Marijn Haverbeke",
          language: "english",
          pages: 500,
          publisher: "No Starch Press",
          title: "Eloquent JavaScript, 4th Edition",
          year: 2020,
        });
        expect(result.statusCode).toEqual(200)
        expect(result.body).toHaveProperty("book");
        expect(result.body.book).toHaveProperty("author")
    })
    test("put invalid isbn", async () => {
        let result = await request(app).put("/books/123").send({
          amazon_url: "https://www.amazon.com/newurl",
          author: "Marijn Haverbeke",
          language: "english",
          pages: 500,
          publisher: "No Starch Press",
          title: "Eloquent JavaScript, 4th Edition",
          year: 2020,
        });
        expect(result.statusCode).toEqual(404);
    })
    test("put invalid input", async () => {
      let result = await request(app).put("/books/123").send("invalid type");
      expect(result.statusCode).toEqual(404);
    });
})

describe("DELETE /books/:id", () => {
    test("delete book", async() => {
        let result = await request(app).delete("/books/1593279507");
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual({ message: "Book deleted" });
    })
})


afterAll(async function () {
  await db.end();
});