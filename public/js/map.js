(function () {
  try {
    if (!window.mapboxgl || !mapToken) return;
    if (!listing || !listing.geometry || !Array.isArray(listing.geometry.coordinates)) return;
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: "map",
      center: listing.geometry.coordinates,
      zoom: 9,
    });
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(listing.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${listing.location}</h4><p>Exact location provided after booking!</p>`
        )
      )
      .addTo(map);
  } catch (e) {
    // fail silently if map cannot initialize
  }
})();