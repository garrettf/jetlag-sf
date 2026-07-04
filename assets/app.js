import { site, navItems, quickLinks } from "../data/site.js";
import { houseRules, hiderRules, seekerRules } from "../data/rules.js";
import { maps } from "../data/maps.js";
import { questions, categoryInfo } from "../data/questions.js";
import { officialRulesHtml } from "../data/official-rules.js";

const page = document.body.dataset.page || "home";
const app = document.querySelector("#app");

const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

function shell(content) {
  document.title = `${pageTitle(page)} · ${site.title}`;
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="${site.title} home">
        <span class="brand-mark">JL</span>
        <span class="brand-copy"><strong>${site.title}</strong><span>${site.subtitle}</span></span>
      </a>
      <span class="header-pill">${site.version}</span>
    </header>
  `);
  app.innerHTML = content;
  document.body.insertAdjacentHTML("beforeend", `
    <nav class="bottom-nav" aria-label="Primary navigation">
      ${navItems.map(item => `<a class="nav-item ${navActive(item.page) ? "active" : ""}" href="${item.href}"><b aria-hidden="true">${item.icon}</b>${item.label}</a>`).join("")}
    </nav>
  `);
}

function pageTitle(id) {
  return ({ home: "Field guide", questions: "Questions", seekers: "Seeker guide", hiders: "Hider guide", maps: "Maps", rules: "Official rules", "house-rules": "SF changes", more: "More" })[id] || site.title;
}

function navActive(id) {
  if (id === page) return true;
  return id === "more" && ["more", "maps", "rules", "house-rules"].includes(page);
}

function hero(eyebrow, title, lede) {
  return `<section class="hero"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lede">${lede}</p></section>`;
}

function renderHome() {
  shell(`<main class="page">
    ${hero("San Francisco · quick reference", "Know the rule. Make the move.", "A mobile-first field guide for our modified Small game of Jet Lag: Hide + Seek.")}
    <div class="stat-strip">
      <div class="stat"><span>Start</span><strong>${site.startingPoint}</strong></div>
      <div class="stat"><span>Zone</span><strong>${site.zoneRadius}</strong></div>
      <div class="stat"><span>Hide time</span><strong>${site.hidingTime}</strong></div>
    </div>
    <section class="section">
      <div class="alert"><span class="alert-icon">⚑</span><div><strong>Sticky endgame</strong><p>Once seekers are off transit inside the zone, the hider freezes until found—even if the seekers leave again.</p></div></div>
    </section>
    <section class="section"><div class="section-head"><div><p class="eyebrow">Jump in</p><h2>What do you need?</h2></div></div><div class="quick-grid">${quickLinks.map(link => `<a class="quick-card ${link.tone}" href="${link.href}"><p class="eyebrow">${link.eyebrow}</p><h3>${link.title}</h3><p>${link.text}</p></a>`).join("")}</div></section>
    <section class="section"><div class="section-head"><div><p class="eyebrow">House rules</p><h2>The big changes</h2></div><a href="house-rules.html">See all</a></div><div class="card-grid">${houseRules.slice(0, 4).map(ruleCard).join("")}</div></section>
  </main>`);
}

function ruleCard(rule) {
  return `<details class="rule-card"><summary><span class="tag">${rule.label}</span><h3>${rule.title}</h3><p>${rule.summary}</p></summary><div class="rule-detail"><ul>${rule.details.map(detail => `<li>${detail}</li>`).join("")}</ul></div></details>`;
}

function renderHouseRules() {
  shell(`<main class="page">${hero("SF modifications", "What changes from the box?", "The local rules that override or clarify the official Small game. Open a card only when you need the edge case.")}<section class="section"><div class="card-grid">${houseRules.map(ruleCard).join("")}</div></section><div class="action-row"><a class="button" href="questions.html">Allowed questions</a><a class="button secondary" href="rules.html">Official rules</a></div></main>`);
}

function renderGuide(role, items) {
  const isHider = role === "Hider";
  shell(`<main class="page">${hero(`${role} field card`, isHider ? "Hide clean. Answer fast." : "Narrow first. Confirm last.", isHider ? "The rules that matter while the clock is running, ordered from setup through endgame." : "A practical sequence for turning questions and transit into a physical find.")}
    <section class="section"><div class="guide-list">${items.map(item => `<article class="guide-card"><div><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join("")}</div></section>
    ${isHider ? `<section class="section"><div class="alert"><span class="alert-icon">📷</span><div><strong>Photo rule</strong><p>Before endgame, pre-shoot anywhere inside your zone. During endgame, only send photos taken at your final spot.</p></div></div></section>` : `<section class="section"><div class="alert"><span class="alert-icon">◎</span><div><strong>Endgame check</strong><p>You trigger endgame only when off transit inside the zone. Once triggered, it stays on.</p></div></div></section>`}
    <div class="action-row"><a class="button" href="questions.html">Open questions</a><a class="button secondary" href="maps.html">Open maps</a></div>
  </main>`);
}

function renderQuestions() {
  const categories = ["All", ...Object.keys(categoryInfo)];
  shell(`<main class="page">${hero("Allowed in SF", "Questions, without the page-flipping.", "Search the noun you need or filter by category. Experimental homebrew questions are clearly marked.")}
    <div class="filters"><input id="question-search" class="search" type="search" placeholder="Search questions…" aria-label="Search questions"><select id="status-filter" class="select" aria-label="Filter question status"><option value="all">All rules</option><option value="standard">Standard</option><option value="experimental">Experimental</option></select></div>
    <div class="category-summary" aria-label="Question categories">${categories.map((category, index) => `<button class="category-chip ${index === 0 ? "active" : ""}" data-category="${category}">${category}</button>`).join("")}</div>
    <div id="question-list" class="question-list"></div>
  </main>`);

  const search = document.querySelector("#question-search");
  const status = document.querySelector("#status-filter");
  const list = document.querySelector("#question-list");
  let category = "All";

  const draw = () => {
    const term = search.value.trim().toLowerCase();
    const filtered = questions.filter(question => {
      const categoryMatch = category === "All" || question.category === category;
      const statusMatch = status.value === "all" || (status.value === "experimental" ? question.status === "experimental" : question.status !== "experimental");
      const termMatch = !term || `${question.title} ${question.prompt} ${question.note} ${question.category}`.toLowerCase().includes(term);
      return categoryMatch && statusMatch && termMatch;
    });
    list.innerHTML = filtered.length ? filtered.map(questionCard).join("") : `<div class="empty">No questions match those filters.</div>`;
  };

  search.addEventListener("input", draw);
  status.addEventListener("change", draw);
  document.querySelectorAll(".category-chip").forEach(chip => chip.addEventListener("click", () => {
    category = chip.dataset.category;
    document.querySelectorAll(".category-chip").forEach(item => item.classList.toggle("active", item === chip));
    draw();
  }));
  draw();
}

function questionCard(question) {
  const statusLabel = ({ allowed: "Standard", modified: "SF modified", "added-medium": "Added from Medium", experimental: "Experimental" })[question.status];
  return `<article class="question-card"><div class="question-top"><div><div class="question-meta"><span class="tag">${question.category}</span><span class="tag ${question.status}">${statusLabel}</span></div><h3>${escapeHtml(question.title)}</h3></div><span class="cost">${question.cost}</span></div><p class="prompt">${escapeHtml(question.prompt)}</p><p class="question-note">${escapeHtml(question.note)}</p>${question.map ? `<a class="map-link" href="maps.html#${question.map}">Open associated map →</a>` : ""}</article>`;
}

function renderMaps() {
  shell(`<main class="page">${hero("SF diagrams", "Maps for the questions that need them.", "Tap any image to open a full-screen, pinch-zoom-friendly version.")}<section class="section"><div class="map-grid">${maps.map(map => `<article class="map-card" id="${map.id}"><button type="button" data-map="${map.id}" aria-label="Open ${map.title}"><img class="map-thumb" src="${map.file}" alt="${map.title}" loading="lazy"><div class="map-copy"><span class="tag">${map.group}</span><h3>${map.title}</h3><p>${map.note}</p></div></button></article>`).join("")}</div></section></main><dialog id="map-dialog"><div class="dialog-head"><strong id="dialog-title"></strong><button class="dialog-close" aria-label="Close map">×</button></div><img class="dialog-image" id="dialog-image" alt=""></dialog>`);
  const dialog = document.querySelector("#map-dialog");
  const image = document.querySelector("#dialog-image");
  const title = document.querySelector("#dialog-title");
  document.querySelectorAll("[data-map]").forEach(button => button.addEventListener("click", () => {
    const map = maps.find(item => item.id === button.dataset.map);
    image.src = map.file;
    image.alt = map.title;
    title.textContent = map.title;
    dialog.showModal();
  }));
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

function renderRules() {
  shell(`<main class="page"><article class="official-rules">${officialRulesHtml}</article></main>`);
}

function renderMore() {
  const links = [
    ["house-rules.html", "SF rule changes", "Overrides, clarifications, and local definitions"],
    ["maps.html", "Maps + diagrams", "Voronoi maps and hiding-zone references"],
    ["rules.html", "Official game rules", "Readable full copy of the base rules"],
    ["questions.html", "Allowed question list", "Costs, wording, and local notes"],
  ];
  shell(`<main class="page">${hero("Reference library", "Everything else, one tap away.", "Long-form rules and visual references stay out of the way until you need them.")}<section class="section"><div class="more-list">${links.map(([href, title, text]) => `<a class="more-link" href="${href}"><div><h3>${title}</h3><span>${text}</span></div></a>`).join("")}</div></section></main>`);
}

({ home: renderHome, questions: renderQuestions, seekers: () => renderGuide("Seeker", seekerRules), hiders: () => renderGuide("Hider", hiderRules), maps: renderMaps, rules: renderRules, "house-rules": renderHouseRules, more: renderMore })[page]?.();
