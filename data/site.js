export const site = {
  title: "Jet Lag SF",
  startingPoint: "Van Ness & Market",
  zoneRadius: "¼ mile",
  hidingTime: "30 minutes",
  atlasMap: "https://app.atlas.co/shared/2CFagzDAW1NEUYBTteYd?loc=-122.4801%2C37.7817%2C13.6715z&public=true",
};

export const navItems = [
  { page: "home", href: "index.html", label: "Home", icon: "⌂" },
  { page: "questions", href: "questions.html", label: "Questions", icon: "?" },
  { page: "seekers", href: "seekers.html", label: "Seekers", icon: "🔎" },
  { page: "hiders", href: "hiders.html", label: "Hiders", icon: "🙈" },
  { page: "atlas", href: site.atlasMap, label: "Atlas", icon: "🗺", external: true },
];

export const quickLinks = [
  { href: "questions.html", icon: "❓", title: "Questions", text: "Allowed questions, costs, and clarifications.", tone: "yellow" },
  { href: "seekers.html", icon: "🔎", title: "Seekers", text: "Rules and useful reminders.", tone: "red" },
  { href: "hiders.html", icon: "🙈", title: "Hiders", text: "Zone, cards, photos, and endgame.", tone: "blue" },
  { href: "house-rules.html", icon: "🛠️", title: "Rule changes", text: "Everything that differs from the official game.", tone: "green" },
  { href: "maps.html", icon: "🗺️", title: "Diagrams", text: "Voronoi maps and zone references.", tone: "blue" },
  { href: "rules.html", icon: "📖", title: "Official rules", text: "Full readable copy of the base rules.", tone: "red" },
];
