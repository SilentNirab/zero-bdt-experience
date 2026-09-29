# Power — The Perfect Energy Drink (1:1 Interactive Experience)

This project is a complete, self-contained, 1:1 recreation of the [Ciao Energy](https://www.ciaoenergy.com/) interactive 3D web experience, rebranded as **Power** with all content translated into English. It includes all assets (3D GLTF/GLB models, HDR environment maps, 4K/AVIF flavor textures, background loop videos, sound effects), animations, and interactions.

---

## 🚀 Quick Start

Run the project with Node.js:

```bash
npm start
```

Or run directly with Node:

```bash
node server.js
```

Then open your browser at **[http://localhost:3000](http://localhost:3000)**.

*(Alternative: You can also use `npx serve .` or any static HTTP server supporting range requests).*

---

## ✨ Features & Architecture

### 1. 3D WebGL Scene (`Three.js`)
- **Realistic 3D Can Rendering**: Custom metallic shaders with roughness/metalness maps (`can-metallic-2.avif`, `spot-mask.avif`).
- **3D Pedestal & Environment**: High-dynamic-range image environment lighting (`hdri2.hdr`) and 3D base pedestal (`base.glb`, `can.glb`).
- **6 Dynamic Flavor Textures**: Real-time switching between all 6 flavors:
  - Double Litchi
  - Coco Citron Vert
  - Kiwi Concombre
  - Pêche Blanche
  - Pomme Rhubarbe
  - Abricot Framboise
- **Postprocessing Pipeline**: `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `SMAAPass`, `FXAAShader`, and `OutputPass`.

### 2. Smooth Scrolling & Animation Engine
- **Lenis Smooth Scroll**: Inertial, fluid scrolling synchronized with GSAP (`lenis.mjs`).
- **GSAP ScrollTrigger & SplitText**:
  - Loader sequence with video playback and counter percentage reveal.
  - Interactive 3D carousel rotating cans according to scroll and drag/swipe.
  - Can zoom-in and 3D angle transitions highlighting back-of-can nutritional facts.
  - Staggered line masking and character animations for typography.
  - Button hover physics and character split animations.

### 3. Sound Effects (Web Audio API)
- Real-time sound synthesis and playback for:
  - Can opening sound (`CIAO-ENERGY-doubleclic-canette.mp3`)
  - Flavor carousel scroll ticks (`CIAO-ENERGY-defilementui.mp3`)
  - UI and button clicks (`CIAO-ENERGY-Clickui.mp3`)
  - Section transitions (`CIAO-ENERGY-transition2.mp3`)
- Dedicated sound mute/unmute toggle in the navbar.

### 4. Background Loops & Media Streaming
- High-definition animated loop videos for each flavor in both `.mp4` and `.webm` formats.
- Pre-loader intro video (`Ciao-energy_loader-v2.mp4` / `.webm`).
- Full HTTP 206 Partial Content (Range request) support in `server.js` for instant seeking and stutter-free video playback.

### 5. Multi-Page Structure
- **Homepage**: [index.html](file:///Users/nirob/Downloads/aa/index.html)
- **Privacy Policy**: [politique-de-confidentialite.html](file:///Users/nirob/Downloads/aa/politique-de-confidentialite.html)
- **Terms of Service**: [cgu.html](file:///Users/nirob/Downloads/aa/cgu.html)
- **Legal Mentions**: [mentions-legales.html](file:///Users/nirob/Downloads/aa/mentions-legales.html)

---

## 📁 Directory Structure

```
.
├── assets/
│   ├── audio/          # UI sound effects (Web Audio API)
│   ├── css/            # Webflow styling and responsive layouts
│   ├── fonts/          # Franklin Gothic ATF, Geist, GeistMono
│   ├── images/         # SVG icons, logos, favicons, badges
│   ├── js/             # GSAP, ScrollTrigger, SplitText, Webflow, Lenis
│   ├── textures/       # AVIF can wraps for all 6 flavors + metallic masks
│   ├── vendor/three/   # Vendored Three.js 0.161.0 & JSM addons
│   ├── videos/         # Flavor loop videos & loader video (mp4 & webm)
│   └── webgl/          # 3D models (can.glb, base.glb) & HDRI map
├── cgu.html
├── index.html
├── mentions-legales.html
├── package.json
├── politique-de-confidentialite.html
├── README.md
└── server.js           # Multi-threaded streaming server with Range support
```
