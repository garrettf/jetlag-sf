const matching = (id, title, note, map, status = "allowed") => ({ id, title, category: "Matching", cost: "Draw 3 · keep 1", prompt: `Is your nearest ${title.toLowerCase()} the same as mine?`, note, map, status });
const measuring = (id, title, note, map, status = "allowed") => ({ id, title, category: "Measuring", cost: "Draw 3 · keep 1", prompt: `Compared to me, are you closer to or further from ${title.toLowerCase()}?`, note, map, status });
const radar = distance => ({ id: `radar-${distance.replace(/\W/g, "-")}`, title: `${distance} radar`, category: "Radar", cost: "Draw 2 · keep 1", prompt: `Are you within ${distance} of me?`, note: "Measure to the hider’s current location, not merely any part of the hiding zone.", status: "allowed" });
const photo = (id, title, note, status = "allowed") => ({ id, title, category: "Photo", cost: "Draw 1 · keep 1", prompt: `Send a photo of ${title.toLowerCase()}.`, note, status });

export const questions = [
  matching("transit-line", "Transit line", "Ask only while riding transit. Answer yes if that exact service stops within ¼ mile of the hider’s chosen hiding station—not simply near the hider.", "hiding-zones", "modified"),
  matching("station-length", "Station name length", "Ignore the word “Station”; count spaces, hyphens, ampersands, and slashes. Ignore periods in street abbreviations."),
  matching("street-path", "Street or path", "Use the official base-game definition."),
  { ...matching("district", "Supervisor district", "This is SF Supervisor District D1–D11.", "district", "modified"), prompt: "Is your supervisor district the same as mine?" },
  { ...matching("mountain", "Hill", "This replaces the base game’s mountain definition. Use the curated list of sixteen SF hills at least 400 ft high.", "mountain", "modified"), displayTitle: "<s>Mountain</s> Hill", prompt: "Is your nearest hill the same as mine?" },
  matching("landmass", "Landmass", "Possible results are Treasure Island, Strawberry Hill, or the rest of San Francisco."),
  matching("dog-park", "Dog park", "Dog parks replace the generic park category.", "dog-park", "modified"),
  matching("golf", "Golf course", "Use the eight qualifying outdoor golf courses.", "golf"),
  matching("museum", "Museum", "Must be a qualifying, mostly indoor, publicly visitable museum with more than five reviews."),
  matching("movie", "Movie theater", "Must be an open indoor venue categorized as a movie theater, with more than five reviews.", "movie"),
  matching("hospital", "Hospital", "Must have an emergency department.", "hospital"),
  matching("library", "Library", "SFPL branches plus the Treasure Island kiosk; no private, school, or sidewalk libraries.", "library"),
  matching("consulate", "Foreign consulate", "Consulates general and TECO count; honorary consulates do not.", "consulate-1"),
  matching("farmers-market", "Farmers market", "Recurring direct-to-consumer market with at least five reviews; seasonal markets still count.", "farmers-market", "experimental"),
  matching("parking", "Parking permit color", "Compare the color of the nearest lettered residential permit zone; “no zone” does not count.", "parking", "experimental"),

  measuring("rail", "Rail station", "BART, Caltrain, subway-style Muni stations, all T stops, and the specifically approved high-platform M/N stops."),
  measuring("sea-level", "Sea level", "Use the official base-game definition."),
  measuring("water", "Body of water", "The body must appear blue on Google Maps."),
  measuring("coastline", "Coastline", "Use the nearer of the Pacific Ocean or San Francisco Bay.", undefined, "modified"),
  { ...measuring("mountain", "Hill", "This replaces the base game’s mountain definition. Use the curated list of sixteen SF hills at least 400 ft high.", "mountain", "modified"), displayTitle: "<s>Mountain</s> Hill", prompt: "Compared to me, are you closer to or further from a hill?" },
  measuring("dog-park", "Dog park", "Dog parks replace the generic park category.", "dog-park", "modified"),
  measuring("aquarium", "Aquarium", "Allowed for measuring only.", "aquarium"),
  measuring("golf", "Golf course", "Use the same qualifying set as matching.", "golf"),
  measuring("museum", "Museum", "Use the same qualifying set as matching."),
  measuring("movie", "Movie theater", "Use the same qualifying set as matching.", "movie"),
  measuring("hospital", "Hospital", "Use the same qualifying set as matching.", "hospital"),
  measuring("library", "Library", "Use the same qualifying set as matching.", "library"),
  measuring("consulate", "Foreign consulate", "Use the same qualifying set as matching.", "consulate-1"),
  measuring("dispensary", "Cannabis dispensary", "Must have at least five reviews and be categorized as a cannabis store or cannabis club.", undefined, "experimental"),

  ...["¼ mile", "½ mile", "1 mile", "3 miles", "5 miles", "10 miles", "25 miles", "50 miles", "100 miles", "a chosen distance"].map(radar),
  { id: "thermometer-half", title: "½-mile thermometer", category: "Thermometer", cost: "Draw 2 · keep 1", prompt: "After traveling ½ mile, am I hotter or colder?", note: "Send the starting pin before moving, then a second pin after traveling at least ½ mile as the crow flies.", status: "allowed" },
  { id: "thermometer-three", title: "3-mile thermometer", category: "Thermometer", cost: "Draw 2 · keep 1", prompt: "After traveling 3 miles, am I hotter or colder?", note: "Send the starting pin before moving, then a second pin after traveling at least 3 miles as the crow flies.", status: "allowed" },

  photo("building-station", "any building visible from the transit station", "Stand at the approved station/stop. Include the roof and both sides; top of building in the top third."),
  photo("widest-street", "the widest street in your zone", "Include both sides of the street."),
  photo("tree", "a tree", "Include the entire tree."),
  photo("tallest-sightline", "the tallest structure in your current sightline", "Tallest from the hider’s perspective. Include the top and both sides."),
  photo("you", "you", "Selfie mode, arm extended, perpendicular to the ground, default lens, no zoom."),
  photo("sky", "the sky", "Place the phone on the ground and shoot straight up with no zoom."),
  photo("trace-path", "a trace of the nearest street or path", "Trace intersection to intersection on a map-visible street/path.", "added-medium"),
  photo("two-buildings", "two buildings", "Show the bottom through no more than four stories.", "added-medium"),
  photo("restaurant", "a restaurant interior", "No zoom; take the photo through a window from outside.", "added-medium"),
  photo("park", "a park", "No zoom, perpendicular to the ground, at least five feet from obstructions. Qualifying Google categories require more than five reviews.", "added-medium"),
  photo("grocery", "a grocery-store aisle", "No zoom; stand at the end and shoot directly down the aisle. Expanded SF store categories require more than five reviews.", "added-medium"),
  photo("worship", "a place of worship", "Show a 5×5-foot section with at least three distinct, matchable elements.", "added-medium"),
  photo("house-number", "a complete house or building number", "Every digit must be visible.", "experimental"),
  { id: "ambient-audio", title: "30 seconds of ambient audio", category: "Photo", cost: "Draw 1 · keep 1", prompt: "Send 30 seconds of ambient audio.", note: "Do not speak, breathe into the microphone, or intentionally interfere with the recording.", status: "experimental" },
];

export const categoryInfo = {
  Photo: { phrasing: "Send me a photo of ___.", answer: "Photo / null", timing: "10 min" },
  Measuring: { phrasing: "Compared to me, are you closer to or further from ___?", answer: "Closer / further", timing: "5 min" },
  Matching: { phrasing: "Is your nearest ___ the same as mine?", answer: "Yes / no", timing: "5 min" },
  Radar: { phrasing: "Are you within ___ of me?", answer: "Yes / no", timing: "5 min" },
  Thermometer: { phrasing: "After traveling ___, am I hotter or colder?", answer: "Hotter / colder", timing: "5 min" },
};
