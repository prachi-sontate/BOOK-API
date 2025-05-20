const Book = require("../models/book");
const Review = require("../models/review");

exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 5 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, "i");
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  const avgRating =
    book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length || 0;

  res.json({ book, averageRating: avgRating.toFixed(1), reviews: book.reviews });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, "i") },
      { author: new RegExp(q, "i") },
    ],
  });
  res.json(books);
};
