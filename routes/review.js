const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { get } = require("http");
const upload =multer({storage});

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
router.post(
  "/",
  isLoggedIn,
   validateListing, wrapAsync(listingcontroller.createListing)
);

// Show route
router.get("/:id", wrapAsync(listingcontroller.showListing)

);

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
router.delete(
  "/:id", 
  isLoggedIn,
  isOwner,
  wrapAsync(listingcontroller.destroyListing)
);
module.exports = router;