# Zlatni Vez website (zlatnivez.org)

Static website for Ansambl Zlatni Vez, a Serbian traditional music ensemble in Chicago.
Plain HTML/CSS/JS, no build step. Every push to `main` is published automatically by Netlify
to https://zlatnivez.org within 1–2 minutes.

## The files in this repo ARE the website
Edit the HTML files directly. There is no generator or template; what you see here is what goes live.

## Two languages — always change both
- English pages: `*.html` in the root (index, concerts, about, kids, blog, gallery, partners, donate, contact, post-*.html)
- Serbian pages (Latin script, latinica): the same file names in `sr/`
- A text change on one page almost always needs the matching change in the other language.
- Serbian uses Latin script only (no Cyrillic in the text), formal "vi" (Kupite, Pišite, Donirajte), "Čikago/Čikaga".
- Paths in `sr/` pages point one level up: `../img/...`, `../style.css`. `sr/site.js` is the Serbian copy of `site.js`.
- Header has an EN | SR switch; keep both links when editing the header.
- Header, footer and the top ticket bar are repeated in every page — change them in all pages (both languages).

## Important settings
- `site.js` (and `sr/site.js`): `TICKETS_URL` = TicketsCandy event link used by every ticket button;
  `STRIPE_LINKS` = Stripe Payment Links for donations (one-time 25/50/100/other, monthly 25/50/100).
- Donations: `donate.html` / `sr/donate.html` currently show a "Coming soon" box (`<div class="donate-card soon">`).
  When the Stripe links are ready, replace that box with `_dev/donate-card-en.html` / `_dev/donate-card-sr.html`
  and fill `STRIPE_LINKS` in both `site.js` files.
- Contact form posts to FormSubmit (formsubmit.co) and arrives at info@zlatnivez.org. No Netlify form settings needed.
- Address used on the site: 4315 Joliet Ave, Lyons, IL 60534. Email: info@zlatnivez.org.

## Images
`img/` — photos are JPG, sponsor logos are `logo_*.png`. Keep new photos under ~1400 px wide and
add a descriptive `alt` text (Serbian alt text on `sr/` pages).

## Style
White background, black/gold/burgundy, thin warm-brown serif menu, beige ticket bar and Donate button.
All styles are in `style.css`. Check every change on a phone-width screen too.
