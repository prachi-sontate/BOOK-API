const express = require("express");
const { addReview, updateReview, deleteReview } = require("../controllers/reviewController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/books/:id/reviews", protect, addReview);
router.put("/reviews/:id", protect, updateReview);
router.delete("/reviews/:id", protect, deleteReview);

module.exports = router;
