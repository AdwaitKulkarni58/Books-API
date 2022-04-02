const express = require("express");
const bodyParser = require("body-parser");
const books = require("./books");

const app = express();

const PORT = 3000;

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookWithId = books.find((book) => book.isbn === id);
  if (!bookWithId) {
    return res.status(404).send("Book not found");
  }
  res.send(bookWithId);
});

app.post("/books", (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;
  const bookExists = books.find((book) => book.isbn === isbn);
  if (bookExists) {
    return res.send("Book already exists");
  }
  const book = {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    longDescription,
    status,
    authors,
    categories,
  };
  books.push(book);
  res.send(book);
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.isbn === id);
  if (!book) {
    return res.status(404).send("Book not found");
  }
  books = books.filter((book) => book.isbn != id);
  res.send("success");
});

app.listen(process.env.PORT || PORT, function () {
  console.log("Listening for changes");
});
