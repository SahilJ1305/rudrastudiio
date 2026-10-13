// Google reviews for Rudra Studio.
//
// The homepage shows reviews in one of these ways (first one that is set up wins):
//   1. VITE_ELFSIGHT_APP_ID   - an Elfsight "Google Reviews" widget (auto-updating, no coding)
//   2. VITE_GOOGLE_PLACES_API_KEY + VITE_GOOGLE_PLACE_ID - live from the Google Places API
//   3. The list below - real reviews you copy from Google (name, stars, text) - nothing is invented
// See .env.example for setup steps.

export const googleStudioInfo = {
  name: "Rudra Studio",
  address: "Shop No. 22, Chourang Terrace Society, Tukai Darshan, Phursungi, Hadapsar, Pune",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rudra+Photo+Studio+Shop+No+22+Chourang+Terrace+Society+Tukai+Darshan+Phursungi+Hadapsar+Pune"
};

// Option 3: paste real reviews here, exactly as written on Google. Example of one entry:
//   { author: "Reviewer Name", rating: 5, text: "The review text...", date: "2 months ago" }
export const googleReviews = [];
