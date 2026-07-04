# Jet Lag SF reference

A static, mobile-first field guide for a modified San Francisco game of **Jet Lag: Hide + Seek**. It is designed for GitHub Pages and has no runtime dependencies or framework build step.

## Edit content

Most changes happen in four small data files:

- `data/questions.js` — allowed questions, costs, wording, status, and map links
- `data/rules.js` — house rules plus seeker/hider field guides
- `data/maps.js` — map labels and descriptions
- `data/site.js` — site name, navigation, and quick facts

Layout and interactions live in `assets/app.js`; visual tokens live in `assets/styles.css`. The individual `.html` files are intentionally tiny page shells.

## Refresh source material

The source documents in `references/` are intentionally ignored by git. After replacing either source file, regenerate the checked-in official-rules module and optimized map assets:

```bash
npm install
npm run build:content
```

This reads:

- `references/official-game-rules.html`
- `references/Jet-Lag-H-S-SF-Rule-Modifications.docx`

## Preview locally

ES modules require a local web server rather than opening the files directly:

```bash
npm run serve
```

Then open `http://localhost:4173`.

## Publish on GitHub Pages

The included workflow deploys the repository as a static Pages artifact on pushes to `main`. In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
