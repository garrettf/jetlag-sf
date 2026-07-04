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
        <span class="brand-copy"><strong>${site.title}</strong></span>
      </a>
    </header>
  `);
  app.innerHTML = content;
  document.body.insertAdjacentHTML("beforeend", `
    <nav class="bottom-nav" aria-label="Primary navigation">
      ${navItems.map(item => `<a class="nav-item ${navActive(item.page) ? "active" : ""}" href="${item.href}"${item.external ? ' target="_blank" rel="noreferrer"' : ""}><b aria-hidden="true">${item.icon}</b>${item.label}</a>`).join("")}
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

function pageHeading(title) {
  return `<header class="page-heading"><h1>${title}</h1></header>`;
}

function renderHome() {
  shell(`<main class="page">
    ${pageHeading("Contents")}
    <div class="quick-grid">${quickLinks.map(link => `<a class="quick-card ${link.tone}" href="${link.href}"><span class="quick-icon" aria-hidden="true">${link.icon}</span><div><h3>${link.title}</h3><p>${link.text}</p></div><b aria-hidden="true">→</b></a>`).join("")}</div>
  </main>`);
}

function ruleCard(rule) {
  return `<details class="rule-card"><summary><span class="tag">${rule.label}</span><h3>${rule.title}</h3><p>${rule.summary}</p></summary><div class="rule-detail"><ul>${rule.details.map(detail => `<li>${detail}</li>`).join("")}</ul></div></details>`;
}

function renderHouseRules() {
  shell(`<main class="page">${pageHeading("SF rule changes")}<div class="card-grid">${houseRules.map(ruleCard).join("")}</div><div class="action-row"><a class="button" href="questions.html">Allowed questions</a><a class="button secondary" href="rules.html">Official rules</a></div></main>`);
}

function renderGuide(role, items) {
  const isHider = role === "Hider";
  shell(`<main class="page">${pageHeading(`${role} reference`)}
    <div class="guide-list">${items.map(item => `<article class="guide-card"><div><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join("")}</div>
    ${isHider ? `<section class="section"><div class="alert"><span class="alert-icon">📷</span><div><strong>Photo rule</strong><p>Before endgame, pre-shoot anywhere inside your zone. During endgame, only send photos taken at your final spot.</p></div></div></section>` : `<section class="section"><div class="alert"><span class="alert-icon">◎</span><div><strong>Endgame check</strong><p>You trigger endgame only when off transit inside the zone. Once triggered, it stays on.</p></div></div></section>`}
    <div class="action-row"><a class="button" href="questions.html">Open questions</a><a class="button secondary" href="maps.html">Open maps</a></div>
  </main>`);
}

function renderQuestions() {
  const categories = Object.keys(categoryInfo);
  const jumpOptions = currentCategory => categories.map(category => `<option value="${category.toLowerCase()}"${category === currentCategory ? " selected" : ""}>${category}</option>`).join("");
  const categorySections = Object.entries(categoryInfo).map(([category, info]) => {
    const categoryQuestions = questions.filter(question => question.category === category);
    return `<section class="question-section" id="${category.toLowerCase()}">
      <div class="question-section-toolbar"><h2>${category}</h2><label><span>Jump to</span><select class="question-section-select" aria-label="Jump to another question type">${jumpOptions(category)}</select></label></div>
      <div class="question-facts"><span><b>Phrasing</b>${info.phrasing}</span><span><b>Cost</b>${categoryQuestions[0]?.cost}</span><span><b>Answer</b>${info.answer}</span><span><b>Time</b>${info.timing}</span></div>
      <div class="compact-question-list">${categoryQuestions.map(questionCard).join("")}</div>
    </section>`;
  }).join("");
  shell(`<main class="page">${pageHeading("Questions")}<nav class="question-jump" aria-label="Question types">${categories.map(category => `<a href="#${category.toLowerCase()}">${category}</a>`).join("")}</nav>${categorySections}</main>`);
  document.querySelectorAll(".question-section-select").forEach(select => select.addEventListener("change", () => {
    location.hash = select.value;
  }));
}

function questionCard(question) {
  const statusLabel = ({ allowed: "Standard", modified: "SF modified", "added-medium": "Added from Medium", experimental: "Experimental" })[question.status];
  const title = question.displayTitle || escapeHtml(question.title);
  const statusTag = question.status === "allowed" ? "" : `<span class="tag ${question.status}">${statusLabel}</span>`;
  return `<details class="question-row"><summary><span>${title}</span>${statusTag}</summary><div class="question-detail"><p class="prompt">${escapeHtml(question.prompt)}</p><p>${escapeHtml(question.note)}</p>${question.map ? `<a class="map-link" href="maps.html#${question.map}">Open associated map →</a>` : ""}</div></details>`;
}

function renderMaps() {
  shell(`<main class="page">${pageHeading("Maps and diagrams")}<div class="map-grid">${maps.map(map => `<article class="map-card" id="${map.id}"><button type="button" data-map="${map.id}" aria-label="Open ${map.title}"><img class="map-thumb" src="${map.file}" alt="${map.title}" loading="lazy"><div class="map-copy"><span class="tag">${map.group}</span><h3>${map.title}</h3><p>${map.note}</p></div></button></article>`).join("")}</div></main><dialog id="map-dialog"><div class="dialog-head"><strong id="dialog-title"></strong><button class="dialog-close" aria-label="Close map">×</button></div><img class="dialog-image" id="dialog-image" alt=""></dialog>`);
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
  shell(`<main class="page">${pageHeading("More")}<div class="more-list">${links.map(([href, title, text]) => `<a class="more-link" href="${href}"><div><h3>${title}</h3><span>${text}</span></div></a>`).join("")}</div></main>`);
}

({ home: renderHome, questions: renderQuestions, seekers: () => renderGuide("Seeker", seekerRules), hiders: () => renderGuide("Hider", hiderRules), maps: renderMaps, rules: renderRules, "house-rules": renderHouseRules, more: renderMore })[page]?.();
