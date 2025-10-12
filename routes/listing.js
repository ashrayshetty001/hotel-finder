const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
// Use in-memory storage to allow running without Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

//Index Route.get()
router
.route("/")
.get( wrapAsync(listingcontroller.index))
.post(
  isLoggedIn, 
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingcontroller.createListing)
);

// New route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);



//  Create route
// Removed duplicate POST "/" route; creation is handled in the .route("/") chain above


// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
   wrapAsync(listingcontroller.renderEditForm)
);

// Update route
router
.route("/:id")
.get(wrapAsync(listingcontroller.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingcontroller.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.destroyListing)
);

// Delete route
// Removed duplicate standalone DELETE route; kept the delete in the .route(":id") chain

module.exports = router;