# Zero — Human Infrastructure & 3D Web Experience

An interactive 3D WebGL web platform and Next.js application built with **Three.js**, **GSAP**, hardware-accelerated **KTX2/Basis/Draco** texture transcoders, and **Framer** design engineering. Features an aerial 3D campus world experience including the **Orbix Headquarters**, interactive career scenarios, and founder letters.

---

## 🗺️ Project Site Map

```mermaid
flowchart TD
    Root["/ (Root Entrance)"] --> Why["/why (3D World Experience)"]
    Root --> Home["/home (Orbix Interactive Scenarios & Overview)"]
    Root --> Letters["/founder-letters (Founder Letters Index)"]

    subgraph "Why Experience (/why)"
        WhyStage1["Stage 1: Pre-Canvas Typography & Origami Unfold"]
        WhyStage2["Stage 2: Shattered Glass Tunnel & Transitions"]
        WhyStage3["Stage 3 & 4: Zero City Campus (Orbix HQ, Apple, Google, OpenAI)"]
        WhyStage5["Stage 5: Free Exploration Mode & HUD Controls"]
    end

    subgraph "Home Page (/home)"
        HomeHero["Hero Section & Reel"]
        HomeScenarios["Real-World Scenarios (Google, OpenAI, Samsung, Nike, Orbix)"]
        HomeFeatures["Interactive Portfolio, Hire & Recruiter Features"]
        HomeWaitlist["Beta Access & Waitlist"]
    end

    subgraph "Founder Letters (/founder-letters)"
        Letters --> L1["/agentic-humans"]
        Letters --> L2["/an-operating-system-for-humans"]
        Letters --> L3["/figuring-it-out"]
        Letters --> L4["/human-inference"]
        Letters --> L5["/long-humans"]
        Letters --> L6["/proof-of-understanding"]
        Letters --> L7["/return-on-you"]
        Letters --> L8["/short-term-incentives-long-term-humans"]
        Letters --> L9["/skills-that-matter"]
        Letters --> L10["/the-compounding-human"]
        Letters --> L11["/the-degree-was-a-proxy-the-proxy-broke"]
        Letters --> L12["/the-human-blueprint"]
        Letters --> L13["/what-good-looks-like"]
        Letters --> L14["/what-you-made-and-what-they-said"]
        Letters --> L15["/who-credentials-the-credential"]
        Letters --> L16["/why-we-refuse-to-be-an-education-company"]
    end
```

### Route Index Table

| Route | Page Name | Description & Tech |
|---|---|---|
| [`/`](http://localhost:3000/) | **Why Zero 3D** | Interactive 3D WebGL world experience (*Three.js, GSAP, Basis, Draco*) |
| [`/why`](http://localhost:3000/why) | **Why Zero 3D** | Direct route alias to the interactive 3D WebGL experience |
| [`/home`](http://localhost:3000/home) | **Home Page** | Complete storytelling overview with high-res **Orbix** campus scenarios |
| [`/founder-letters`](http://localhost:3000/founder-letters) | **Founder Letters** | Essay directory with complete typography, reading UI, and navigation |
| `/founder-letters/:slug` | **Article Pages** | 16 individual essay pages covering education, human agency, and tech |

---

## 📁 Repository Structure

```text
.
├── zero-next/                         # 🚀 Production Next.js 14 App
│   ├── app/
│   │   ├── layout.jsx                 # App root layout, HTML shell & metadata
│   │   └── page.jsx                   # WebGL canvas (#webgl) & 3D loader
│   ├── next.config.mjs                # Production routing & rewrites
│   ├── package.json                   # Dependencies & build scripts
│   ├── .gitignore                     # Production ignore rules (.next, node_modules)
│   ├── README.md                      # Next.js specific guide
│   └── public/                        # Public static assets & runtime
│       ├── home.html                  # Framer Home experience with Orbix HQ
│       ├── why.html                   # Why 3D page redirector
│       ├── founder-letters.html       # Founder Letters hub
│       ├── founder-letters/           # All individual letter articles
│       ├── assets/                    # 100% locally-hosted assets
│       │   ├── main-B9-HtP-f.js       # Three.js 3D application bundle
│       │   ├── main-yeWZtezw.css      # 3D experience stylesheet
│       │   ├── textures/              # world_city_orbix.jpg & matcaps
│       │   ├── atlases/               # Compressed KTX2 GPU texture atlases
│       │   ├── models/                # 3D GLTF/GLB models (hands, camera, shards)
│       │   ├── origami/               # 3D origami models (goldfish, wolf, cat, etc.)
│       │   ├── audio/                 # Ambience & SFX audio files
│       │   ├── videos/                # Company card MP4 loops
│       │   └── vendor-media/          # Scenario scroller & city assets
│       └── vendor/                    # Hardware decoders (Draco & Basis wasm)
│
├── zero/                              # 📦 Standalone Static HTML Distribution
│   ├── index.html                     # Entry landing page
│   ├── home.html                      # Standalone Home page
│   ├── why.html                       # Standalone Why page
│   ├── founder-letters.html           # Standalone Letters index
│   ├── founder-letters/               # Standalone Letter articles
│   ├── assets/                        # Complete asset mirror
│   └── vendor/                        # Draco & Basis decoders
│
├── README.md                          # Repository overview & site map
└── .gitignore                         # Root ignore patterns
```

---

## ⚡ Quick Start

### Running with Next.js (Recommended)
```bash
cd zero-next
npm install
npm run build
npm start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Running in Development Mode
```bash
cd zero-next
npm run dev
```

---

## ☁️ Deployment Guide (Live URL via Vercel)

This repository is optimized for one-click deployment on **Vercel**:

1. Import this repository (`SilentNirab/zero-bdt-experience`) on [vercel.com/new](https://vercel.com/new).
2. Set the **Root Directory** setting to: `zero-next`.
3. Click **Deploy**.
4. Vercel will automatically build the Next.js app and assign a live production URL with free SSL and worldwide CDN edge routing.

---

## 🔒 Asset Integrity
- **100% Locally Hosted**: No reliance on third-party Framer CDN buckets or external video/image hosts.
- **Hardware-Accelerated**: Decodes KTX2/Basis Universal textures directly into GPU-native formats for steady 60 FPS performance.
