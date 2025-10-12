const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Create a new review for a listing
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete a specific review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;