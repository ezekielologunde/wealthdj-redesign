---
project: wealthdj-redesign
type: project-overview
status: active
last_updated: 2026-08-22
---

# WealthDJ Redesign

Static marketing/portfolio website for **DJ Wealth** (AKA Supastazz), an Afrogospel selector — a DJ blending gospel/worship vocals with African rhythm across mixtapes, described in the site copy as "over a decade" of work, 25 mixtapes, 100+ collaborating artists, 435K+ streams on Audiomack.

The site is a sub-property of **HoWz Studios** ("the mothership" — linked from the nav on every page). Several pages (`branding.html`, `cinema.html`, `contact.html`, `design.html`, `howz.html`, `photography.html`) are **not real content pages** — they are meta-refresh redirect stubs that forward visitors to the corresponding page on `https://howzstudios.vercel.app/`, because that HoWz Studios content moved off this repo. See [[Decisions]] for why.

## Stack

- **Plain static HTML/CSS/JS** — no framework, no build step, no package manager (no `package.json`, no bundler config found in the repo).
- `assets/css/style.css` — single stylesheet (~400 lines) driving the whole "WF" (WealthDJ) design system (custom properties, `.wf-*` class prefix).
- `assets/js/site.js` — shared cross-page behavior: mobile nav toggle, scroll-reveal via `IntersectionObserver`, custom cursor, scroll-progress "chapter" indicator.
- `assets/js/radio-core.js` — a persistent, cross-page "radio" mini-player built on the **SoundCloud Widget JS API** (`w.soundcloud.com/player/api.js`), with playback position/track index/mute state persisted in `sessionStorage` so it survives page navigation. A bonus track streams from **Mixcloud** but is called out in code comments as manual-only (Mixcloud has no reliable auto-advance JS API).
- `assets/js/waveform.js` — the animated `<canvas>` waveform background visible behind the hero/nav on every page.
- Google Fonts (Unbounded, Manrope, IBM Plex Mono) loaded via `<link>` — no local font hosting.
- Images are `.webp` (mixtape covers) and `.jpg`/`.png` (photography, portraits, profile art) served directly from `assets/img/`.

No backend, no database, no auth, no payments, no server-side code of any kind exist in this repo — omitted intentionally from this documentation set. This is a pure static site (deployable as-is to any static host / CDN).

## Purpose

Marketing/portfolio site: introduce DJ Wealth, showcase the mixtape catalog and collaborating artists ("Ensemble"), aggregate streaming/social channels, host a live "radio" player, and route booking inquiries to HoWz Studios' booking channel.

## Pages

| Page | Role |
|---|---|
| `index.html` | Home — hero, stats, "Now Spinning" teaser |
| `sound.html` | "The Sound" — mixtape catalog/wheel, full catalog grid |
| `ensemble.html` | "The Ensemble" — featured & searchable roster of collaborating artists |
| `booking.html` | Booking info — routes inquiries to HoWz Studios |
| `channels.html` | Streaming/social platform links, cover-wall gallery, newsletter signup |
| `radio.html` | Dedicated radio player page (SoundCloud rotation + Mixcloud bonus track) |
| `branding.html`, `cinema.html`, `contact.html`, `design.html`, `howz.html`, `photography.html` | Redirect stubs → `howzstudios.vercel.app` (HoWz Studios content, moved out of this repo) |

See [[Features]] for what each page actually implements, [[Architecture]] for how the shared JS/CSS system works, [[Decisions]] for the redirect/migration rationale, and [[Changelog]] for history.

## Documentation scope note

This project has no database, backend service, security/auth surface, or payments flow — `Database.md`, `Backend.md`, `Security.md`, and `Payments.md` are intentionally omitted from this documentation set. `Architecture.md` is folded into this file rather than kept separate, since the "architecture" of a static multi-page site with two shared JS modules is small enough to cover here.
