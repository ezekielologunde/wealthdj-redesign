---
project: wealthdj-redesign
type: decisions
status: active
last_updated: 2026-08-22
---

# Decisions

See [[Project]], [[Changelog]].

## Redirect old HoWz Studios pages to howzstudios.vercel.app

The repo's only visible commit (`3dd13fa`) converts `branding.html`, `cinema.html`, `contact.html`, `design.html`, `howz.html`, and `photography.html` from real content pages into meta-refresh redirect stubs pointing at `https://howzstudios.vercel.app/`. Each stub sets `rel="canonical"` to the new URL and `<meta name="robots" content="noindex">`, so search engines de-index the old page and credit the new one — standard practice for preserving inbound links/SEO equity during a site migration.

**Rationale (inferred from code):** HoWz Studios — the parent brand/agency this DJ Wealth site nests under — moved its own portfolio content (branding, cinema, contact, design, photography work, and its own homepage) to a dedicated Vercel-hosted site. Rather than delete those pages from this repo (breaking any existing links), they were kept as thin, no-index redirect shims. This confirms `wealthdj-redesign` is scoped specifically to the DJ Wealth artist site, with HoWz Studios' broader agency portfolio living elsewhere.

## No framework / no build step

The site is authored as plain static HTML/CSS/JS with no `package.json`, bundler, or framework. For a small multi-page marketing site with no dynamic data, this avoids build tooling overhead entirely — pages can be edited and deployed directly.

## SoundCloud for auto-rotating radio, Mixcloud for a manual bonus track

`radio-core.js` comments explain the split explicitly: SoundCloud exposes a Widget JS API that can be "reliably controlled" (auto-advance, seek, load), while Mixcloud's embed does not expose an equivalent auto-advance API in practice — so the Mixcloud track is kept outside the rotation and requires the listener to press play manually.

## Booking funneled to HoWz Studios rather than a form

`booking.html` states bookings are "handled through HoWz Studios" rather than offering an in-page contact form — booking inquiries are centralized at the parent brand rather than duplicated per artist site.
