export const houseRules = [
  {
    id: "ruleset",
    label: "Ruleset",
    title: "Play Small, with selected Medium photos",
    summary: "Use the Small game rules and question set, plus six Medium photo questions that work well in dense San Francisco.",
    details: ["Trace Nearest Street/Path", "Two Buildings", "Restaurant Interior", "Park", "Grocery Store Aisle", "Place of Worship"],
  },
  {
    id: "photos",
    label: "House rule",
    title: "Pre-shoot photos until endgame",
    summary: "The hider may anticipate photo questions and take photos anywhere inside the hiding zone before endgame.",
    details: ["Once endgame begins, only send photos taken from the final fixed hiding spot.", "Normal photo deadlines and null-answer rules still apply."],
  },
  {
    id: "sticky-endgame",
    label: "House rule",
    title: "Endgame never turns off",
    summary: "Once seekers are off transit inside the hiding zone, endgame remains active until the hider is found.",
    details: ["The hider is fixed even if seekers leave the zone again.", "The hider does not have to announce an unnoticed trigger unless a question would require movement."],
  },
  {
    id: "boundaries",
    label: "Map",
    title: "San Francisco city limits",
    summary: "The game area is the City and County of San Francisco, including Treasure Island and excluding the Farallons, Alcatraz, and SF-owned fragments without usable stations.",
    details: ["Travel outside the border is allowed, but the final hiding zone must be inside it.", "A hiding zone is clipped by the city boundary."],
  },
  {
    id: "stations",
    label: "Map",
    title: "Hiding stations are curated",
    summary: "Final zones must be centered on an approved BART, Caltrain, Muni Metro, or selected Muni stop.",
    details: ["The hider chooses one specific station even if several station zones overlap.", "That chosen station controls station-based answers."],
  },
  {
    id: "definitions",
    label: "Definitions",
    title: "SF-specific nouns",
    summary: "4th administrative division means Supervisor District; mountain is replaced by a curated hill list over 400 ft; park means dog park for matching and measuring.",
    details: ["Coastline includes both the Pacific Ocean and San Francisco Bay.", "See each question card for the exact allowed set."],
  },
];

export const hiderRules = [
  { title: "Reach a valid zone", text: "Within 30 minutes, choose an approved station and get within ¼ mile of it." },
  { title: "Stay in the zone", text: "After hiding time, remain inside the zone until a valid move card or endgame." },
  { title: "Answer one at a time", text: "Answer truthfully within 5 minutes; photo questions allow 10 minutes." },
  { title: "Hand limit: 6", text: "If an event puts more than six cards in hand, immediately play or discard down to six." },
  { title: "Prepare your photos", text: "Pre-shoot within the zone before endgame. In endgame, only use photos from the final spot." },
  { title: "Freeze for endgame", text: "When seekers are off transit inside the zone, stay at one public spot until found—even if they leave again." },
];

export const seekerRules = [
  { title: "Travel as one team", text: "All seekers move together throughout the round." },
  { title: "Ask one question at a time", text: "Do not ask another question until the hider answers the previous one." },
  { title: "Send exact locations", text: "For measuring, radar, and thermometer questions, share clear map pins and the requested context." },
  { title: "No Street View", text: "Do not use Street View to match photo clues or verify stations from afar. Satellite imagery is allowed." },
  { title: "Know when endgame starts", text: "Endgame begins when the team is off transit inside the hiding zone; once active, it stays active." },
  { title: "Use questions in stages", text: "Use broad comparisons to reduce the map, then radars, photos, and physical searching to confirm the zone." },
];
