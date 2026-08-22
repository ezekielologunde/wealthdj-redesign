---
project: wealthdj-redesign
type: changelog
status: active
last_updated: 2026-08-22
---

# Changelog

See [[Decisions]] for rationale behind these changes.

## 2026-08-22

- Only commit visible in this shallow clone: **`3dd13fa` — Redirect old HoWz Studios pages to the new howzstudios Vercel site.** Converted `branding.html`, `cinema.html`, `contact.html`, `design.html`, `howz.html`, and `photography.html` into no-index, canonical-tagged meta-refresh redirects to `https://howzstudios.vercel.app/`, completing the separation of HoWz Studios' general agency portfolio from the DJ Wealth artist site.
- Added Obsidian-compatible documentation knowledge base under `docs/obsidian/` (this change).

> Note: this clone is shallow (`git rev-parse --is-shallow-repository` → true) with a single reachable commit, so the full project history predating this snapshot is not visible here. If deeper history is needed, unshallow the clone against the GitHub remote.
