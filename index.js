require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const database = require("./database/index");

const shapeAI = express();

shapeAI.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection Established!!!!!!!!"));

shapeAI.get("/", (req, res) => {
  return res.json({ books: database.books });
});

//isbn
shapeAI.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

//category
shapeAI.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

//author
shapeAI.get("/author", (req, res) => {
  const getSpecificBook = database.authors;
  return res.json({ authors: database.authors });
});

/*
shapeAI.get("/author/:isbn", (req, res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthors.length === 0) {
    return res.json({
      error: `No authors found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthors });
});
*/

//publications
shapeAI.get("/publications", (req, res) => {
  return res.json({ publications: database.publications });
});

shapeAI.get("/publication/:isbn", (req, res) => {
  const getSpecificPublicatons = database.publications.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getSpecificPublicatons.length === 0) {
    return res.json({
      error: `No publications found for the book ${req.params.isbn}`,
    });
  }
  return res.json({ authors: getSpecificPublicatons });
});

shapeAI.post("/book/new", (req, res) => {
  const { newBook } = req.body;
  database.books.push(newBook);

  return res.json({ books: database.books, message: "book was added!" });
});

shapeAI.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;
  database.authors.push(newAuthor);

  return res.json({ authors: database.authors, message: "author was added!" });
});

shapeAI.put("/book/update/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.bookTitle;
      return;
    }
  });
  return res.json({ books: database.books });
});

shapeAI.put("/book/author/update/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn)
      return book.authors.push(req.body.newAuthor);
  });
  // database.authors.forEach((author) => {
  //   if (author.id === req.body.newAuthor)
  //     return author.books.push(req.params.isbn);
  // });

  return res.json({
    books: database.books,
    authors: database.authors,
    message: "New author was added",
  });
});

shapeAI.listen(3000, () => console.log("Server Running!!!"));
