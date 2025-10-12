// Controller for listings
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
// Create client only if token is present to allow app to run without Mapbox
const geocodingClient = mapboxToken ? mbxGeocoding({ accessToken: mapboxToken }) : null;

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response;
  if (geocodingClient) {
    response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
  }

  // When running without Cloudinary, multer memory storage doesn't provide path/filename
  let url = req.file && req.file.path ? req.file.path : (req.body.listing.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop");
  let filename = req.file && req.file.filename ? req.file.filename : (req.file ? "uploaded-memory" : "placeholder");
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Provide geometry from geocoding if available; fallback to a default coordinate
  const defaultCoordinates = [77.2090, 28.6139]; // Delhi (lng, lat)
  newListing.geometry = {
    type: "Point",
    coordinates: response?.body?.features?.[0]?.geometry?.coordinates || defaultCoordinates,
  };

  let savedListing = await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (req.file) {
    // memory storage won't have path/filename; fall back to previous or placeholder
    let url = req.file.path || listing.image?.url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop";
    let filename = req.file.filename || listing.image?.filename || "placeholder";
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};