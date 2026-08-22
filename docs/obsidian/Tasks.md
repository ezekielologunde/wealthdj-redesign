---
project: wealthdj-redesign
type: tasks
status: active
last_updated: 2026-08-22
---

# Tasks

See [[Project]], [[Features]].

## Observations / possible gaps

No `TODO`/`FIXME`/`XXX` markers were found anywhere in the HTML/CSS/JS source. Items below are gaps inferred from reading the code, not markers left by the original author — verify before acting.

- **No analytics** observed in any audited page — if traffic/engagement tracking is desired, it isn't wired up yet.
- **No sitemap.xml or robots.txt** found in the repo root — worth adding for SEO given the noindex redirect stubs already rely on search-engine cooperation.
- **Mixtape/artist data is hand-authored in HTML** (`sound.html`, `ensemble.html`) rather than sourced from a data file — adding/removing a mixtape or artist means editing markup directly; no CMS or JSON data layer exists.
- **Booking has no in-page form** — relies entirely on the reader following through to HoWz Studios; if a follow-up analytics goal (e.g. conversion tracking) is wanted, there's no local funnel to instrument.
- **Shallow git history** — only one commit (`3dd13fa`) is present in this clone; earlier project history (the actual "redesign" work implied by the repo name) is not visible from this checkout. Confirm with a full clone/`git log` on the actual remote if deeper history matters.
