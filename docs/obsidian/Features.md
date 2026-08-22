---
project: wealthdj-redesign
type: features
status: active
last_updated: 2026-08-22
---

# Features

See [[Project]] for stack/purpose context.

## Implemented

- **Persistent cross-page radio player** (`assets/js/radio-core.js`) — SoundCloud Widget API drives a rotation of 3 tracks; current track index, playback position (ms), and mute state persist in `sessionStorage` (`wfRadioIdx`, `wfRadioPos`, `wfRadioUnmuted`) so playback survives navigating between pages. A 4th "bonus" track streams from Mixcloud but is deliberately excluded from auto-rotation (manual play only) because Mixcloud's embed lacks a reliable auto-advance JS API.
- **Animated canvas waveform background** (`assets/js/waveform.js`) — reacts to playback, rendered behind the nav/hero on every page (`#wf-canvas`).
- **Scroll-reveal animations** — `.rv` class elements fade/slide in via `IntersectionObserver`, disabled when `prefers-reduced-motion: reduce` is set.
- **Custom cursor** — enabled only on pointer-fine/hover-capable devices (`matchMedia('(hover: hover) and (pointer: fine)')`).
- **Scroll-progress "chapter" indicator** — a top progress bar + "Now Reading" label reflecting scroll position, per-page label via `data-page-label` on `<body>`.
- **Responsive mobile nav** — hamburger toggle (`.wf-nav__toggle`) with `aria-expanded` state.
- **Mixtape catalog** (`sound.html`) — cover-art grid pulling from `assets/img/covers/` (~19 mixtape covers).
- **Ensemble/artist roster** (`ensemble.html`) — featured artists + a searchable roster.
- **Channel aggregation** (`channels.html`) — links out to streaming/social platforms, a cover-wall gallery, and a newsletter signup section.
- **Booking routing** (`booking.html`) — informational page; actual booking is explicitly routed to HoWz Studios ("Bookings are handled through HoWz Studios") rather than a form on this site.
- **SEO basics** — per-page `<title>` and meta description on real content pages; redirect stub pages are marked `<meta name="robots" content="noindex">` with a `rel="canonical"` pointing at the real destination.

## Redirect stubs (not features of this site)

`branding.html`, `cinema.html`, `contact.html`, `design.html`, `howz.html`, `photography.html` are meta-refresh (`<meta http-equiv="refresh" content="0; url=...">`) redirects to `https://howzstudios.vercel.app/...`. They exist to preserve old inbound links after HoWz Studios content was migrated off this repo. See [[Decisions]].

## Not present

- No booking/contact form with server-side handling — booking is described in text, not collected in-app.
- No CMS/data layer — mixtape and artist data appears to be hand-authored directly in HTML (not confirmed against a JSON/data file, since none exists in the repo).
- No analytics script observed in the audited markup.
