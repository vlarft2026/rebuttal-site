# Anonymous ICML Rebuttal Website

This repository contains a simple static website for hosting supplementary rebuttal results anonymously.

## Files

- `index.html`: page structure and prose
- `style.css`: styling
- `script.js`: quantitative results

## Local preview

Open `index.html` directly in a browser, or serve the folder with a simple static file server.

## Anonymous-site checklist

- Do not include author names, institution names, project names, or lab branding.
- Avoid analytics scripts, comment widgets, or external fonts.
- If you deploy it publicly, use a neutral repository/site name.
- Double-check figures and captions for hidden identifiers.

## Quick edits

- Replace numbers in `script.js` if you update results.
- Add new sections in `index.html` for extra ablations or videos.
- Drop qualitative figures into an `assets/` folder and reference them from `index.html`.
