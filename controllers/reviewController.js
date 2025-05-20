const Review = require("../models/review");
const Book = require("../models/book");

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;

  const exists = await Review.findOne({ user: req.user._id, book: bookId });
  if (exists) return res.status(400).json({ message: "Review already exists" });

  const review = await Review.create({ user: req.user._id, book: bookId, rating, comment });
  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await Review.findByIdAndDelete(review._id);
await Book.findByIdAndUpdate(review.book, {
  $pull: { reviews: review._id }
});
  res.json({ message: "Review deleted" });
};
