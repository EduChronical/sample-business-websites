# Sample Business Websites

Three fully responsive demo websites built with plain HTML, CSS and vanilla JavaScript (no build step).

| Site | Folder | Highlights |
|---|---|---|
| Spice Route Kitchen (restaurant) | `restaurant/` | Hero, tabbed menu with ₹ prices, gallery lightbox, reviews, live open/closed status, Google Map, reservation form → WhatsApp |
| CarePlus Family Clinic | `clinic/` | Services, doctors, department → doctor booking form, timings, map, FAQ, WhatsApp |
| Rahul Varma portfolio | `portfolio/` | Typing hero, dark/light mode, skills bars, filterable projects, testimonials, contact form → email |

All businesses and people are fictional. Photos are from [Unsplash](https://unsplash.com/license) and are stored locally in each `assets/` folder.

## Customise for a client
- Business name, text, prices: edit `index.html` in the site folder.
- WhatsApp number: set `WHATSAPP_NUMBER` at the top of `main.js` (country code, no `+`, e.g. `919xxxxxxxxx`).
- Colours: change the CSS variables in `:root` at the top of `style.css`.
- Map: change the `q=` address in the Google Maps `iframe` URL.

## Run locally
Open any `index.html` in a browser, or run `python3 -m http.server` in this folder.
