# Orbix — Learn. Build. Get Hired.

A pixel-perfect, 1:1 rebuilt interactive web experience of [Zero University](https://www.zero.university/), completely rebranded as **Orbix**.

---

## 🚀 Quick Start

Run the server with Node.js:

```bash
npm start
```

Or run directly:

```bash
node server.js
```

Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## 🌟 Features & Rebuild Overview

### 1. 100% Brand Rebrand (`ZERO` → `ORBIX`)
- **Name & Brand Identity**: Every mention of "Zero" has been replaced with "Orbix", and "ZERO" with "ORBIX" across all typography, titles, headings, and copy.
- **Custom Orbix Monogram**: Hand-crafted, modern high-resolution brand icon (`/assets/images/orbix-monogram.png` & `.svg`) integrated into the navigation, tab favicons, and mobile headers.
- **Contact & Domains**: Rebranded to `team@orbix.university` and `https://www.orbix.university`.
- **Search Index**: Rebranded search database (`/assets/framer/searchIndex.json`) for instant client-side lookup.

### 2. Complete Multi-Page Suite (28 Distinct Pages)
All pages are fully reconstructed with identical visual structure, responsive layouts, and interactive components:
- **Core Pages**:
  - Home: `/`
  - Our Story: `/our-story`
  - Why: `/why`
  - Insights: `/insights`
  - Waitlist: `/waitlist`
  - Beta Form: `/betaform`
  - TPN: `/tpn`
  - Ads: `/ads`
  - Manifesto Page: `/page`
  - Attribution: `/admin/attribution`
  - Custom 404: `/404`
- **Founder Letters (All 16 Letters)**:
  - `/founder-letters` (Hub)
  - `/founder-letters/long-humans`
  - `/founder-letters/agentic-humans`
  - `/founder-letters/the-human-blueprint`
  - `/founder-letters/an-operating-system-for-humans`
  - `/founder-letters/the-degree-was-a-proxy-the-proxy-broke`
  - `/founder-letters/short-term-incentives-long-term-humans`
  - `/founder-letters/the-compounding-human`
  - `/founder-letters/why-we-refuse-to-be-an-education-company`
  - `/founder-letters/human-inference`
  - `/founder-letters/who-credentials-the-credential`
  - `/founder-letters/figuring-it-out`
  - `/founder-letters/proof-of-understanding`
  - `/founder-letters/return-on-you`
  - `/founder-letters/what-you-made-and-what-they-said`
  - `/founder-letters/what-good-looks-like`
  - `/founder-letters/skills-that-matter`

### 3. Faithful Typography, Colors & Animations
- **Exact Typography**: Google Sans Flex (300, 400, 500, 600, 700) and Fustat Arabic/Latin web fonts with full font-feature support.
- **Identical Styling**: Exact colors (`#000000`, `#ffffff`, `#1b2c22`, etc.), superellipse smooth border radii, cards, interactive carousels, and responsive breakpoints.
- **Motion & Appear Animations**: Framer Motion appear effects, spring transitions, scroll-driven transforms, and video backgrounds.
- **Interactive Form Handling**: Instant submission feedback with confetti celebration and local lead storage.

### 4. Zero External Dependency Server (`server.js`)
- Built with pure Node.js standard libraries.
- Clean URL routing (`/our-story`, `/founder-letters/long-humans`).
- HTTP 206 Partial Content (Range requests) for smooth video playback.
- Proper MIME types for ES modules (`.mjs`), JSON, AVIF images, and MP4 videos.

---

## 📁 Project Structure

```
.
├── assets/
│   ├── framer/         # Rebranded ES modules & search index
│   ├── images/         # Orbix brand monogram (PNG & SVG)
│   └── js/             # Orbix client-side runtime engine
├── founder-letters/    # 16 individual founder letters (folders & HTML)
├── scripts/
│   ├── build-orbix.js  # Crawler & automated rebuilder script
│   └── refine-orbix.js # Brand perfection & link refinement script
├── 404.html
├── ads.html
├── betaform.html
├── founder-letters.html
├── index.html
├── insights.html
├── our-story.html
├── package.json
├── page.html
├── README.md
├── server.js           # Production streaming HTTP server
├── tpn.html
├── waitlist.html
└── why.html
```
