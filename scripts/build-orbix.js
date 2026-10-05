import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const FRAMER_BASE = 'https://framerusercontent.com/sites/73xB564IOXN3fxLDmuwOJV/';
const TARGET_DIR = ROOT_DIR;
const FRAMER_ASSETS_DIR = path.join(ROOT_DIR, 'assets', 'framer');

fs.mkdirSync(FRAMER_ASSETS_DIR, { recursive: true });

const PAGES = [
  '/',
  '/ads',
  '/our-story',
  '/insights',
  '/why',
  '/founder-letters',
  '/waitlist',
  '/betaform',
  '/tpn',
  '/page',
  '/admin/attribution',
  '/founder-letters/long-humans',
  '/founder-letters/agentic-humans',
  '/founder-letters/the-human-blueprint',
  '/founder-letters/an-operating-system-for-humans',
  '/founder-letters/the-degree-was-a-proxy-the-proxy-broke',
  '/founder-letters/short-term-incentives-long-term-humans',
  '/founder-letters/the-compounding-human',
  '/founder-letters/why-we-refuse-to-be-an-education-company',
  '/founder-letters/human-inference',
  '/founder-letters/who-credentials-the-credential',
  '/founder-letters/figuring-it-out',
  '/founder-letters/proof-of-understanding',
  '/founder-letters/return-on-you',
  '/founder-letters/what-you-made-and-what-they-said',
  '/founder-letters/what-good-looks-like',
  '/founder-letters/skills-that-matter',
  '/404'
];

function rebrandContent(str) {
  return str
    // Domains & emails
    .replace(/team@zero\.university/g, 'team@orbix.university')
    .replace(/https:\/\/www\.zero\.university/g, 'https://www.orbix.university')
    .replace(/https:\/\/zero\.university/g, 'https://orbix.university')
    .replace(/www\.zero\.university/g, 'www.orbix.university')
    .replace(/zero\.university/g, 'orbix.university')
    // Search index URL
    .replace(/https:\/\/framerusercontent\.com\/sites\/73xB564IOXN3fxLDmuwOJV\/searchIndex-[^"]+\.json/g, '/assets/framer/searchIndex.json')
    // Monogram image
    .replace(/https:\/\/framerusercontent\.com\/images\/uGIzU8Moejeuhzj6Hyw1IPSI\.png(?:\?[^"]*)?/g, '/assets/images/orbix-monogram.png')
    // Brand titles & headings
    .replace(/Zero — /g, 'Orbix — ')
    .replace(/ — Zero/g, ' — Orbix')
    .replace(/Zero University/g, 'Orbix University')
    .replace(/ZERO UNIVERSITY/g, 'ORBIX UNIVERSITY')
    // Monogram alt and names
    .replace(/Zero-monogram/g, 'Orbix-monogram')
    .replace(/ZERO PROFILE/g, 'ORBIX PROFILE')
    .replace(/ZERO SOLID BLACK/g, 'ORBIX SOLID BLACK')
    .replace(/ZERO CITY/g, 'ORBIX CITY')
    .replace(/Zero campus aerial/g, 'Orbix campus aerial')
    .replace(/Zero Waitlist/g, 'Orbix Waitlist')
    .replace(/ZERO LOGO/g, 'ORBIX LOGO')
    // General brand word replacements
    .replace(/\bZERO\b/g, 'ORBIX')
    .replace(/\bZero\b/g, 'Orbix')
    // Rewrite Framer site base URL to local
    .replace(/https:\/\/framerusercontent\.com\/sites\/73xB564IOXN3fxLDmuwOJV\//g, '/assets/framer/');
}

async function fetchSearchIndex() {
  console.log('Fetching and rebranding search index...');
  const res = await fetch(`${FRAMER_BASE}searchIndex-u4mOkL5EtKYV.json`);
  const text = await res.text();
  const rebranded = rebrandContent(text);
  fs.writeFileSync(path.join(FRAMER_ASSETS_DIR, 'searchIndex.json'), rebranded, 'utf-8');
  console.log('Saved assets/framer/searchIndex.json');
}

const discoveredModules = new Set();

async function downloadPages() {
  console.log(`Downloading and rebranding ${PAGES.length} pages...`);

  for (const pagePath of PAGES) {
    const fetchUrl = pagePath === '/404' 
      ? 'https://www.zero.university/404' 
      : `https://www.zero.university${pagePath}`;

    try {
      const res = await fetch(fetchUrl);
      const html = await res.text();

      // Find all referenced .mjs modules
      const matches = [...html.matchAll(/(?:src|href)="([^"]*\/sites\/73xB564IOXN3fxLDmuwOJV\/([^"]+\.mjs))"/g)];
      for (const m of matches) {
        discoveredModules.add(m[2]);
      }

      let rebrandedHtml = rebrandContent(html);

      // Add our custom orbix-runtime.js before </body>
      const runtimeInject = '<script src="/assets/js/orbix-runtime.js"></script>\n</body>';
      rebrandedHtml = rebrandedHtml.replace('</body>', runtimeInject);

      // Save HTML to destination
      if (pagePath === '/') {
        fs.writeFileSync(path.join(TARGET_DIR, 'index.html'), rebrandedHtml, 'utf-8');
      } else if (pagePath === '/404') {
        fs.writeFileSync(path.join(TARGET_DIR, '404.html'), rebrandedHtml, 'utf-8');
      } else {
        const cleanName = pagePath.replace(/^\//, '');
        // Save as cleanName.html
        const directFile = path.join(TARGET_DIR, `${cleanName}.html`);
        fs.mkdirSync(path.dirname(directFile), { recursive: true });
        fs.writeFileSync(directFile, rebrandedHtml, 'utf-8');

        // Also save as cleanName/index.html for static folder hosting compatibility
        const folderIndex = path.join(TARGET_DIR, cleanName, 'index.html');
        fs.mkdirSync(path.dirname(folderIndex), { recursive: true });
        fs.writeFileSync(folderIndex, rebrandedHtml, 'utf-8');
      }

      console.log(`✓ Saved ${pagePath}`);
    } catch (err) {
      console.error(`✗ Error downloading ${pagePath}:`, err.message);
    }
  }
}

async function downloadModules() {
  console.log(`\nCrawling and downloading Framer JS modules... Initial seed: ${discoveredModules.size} modules`);
  const queue = [...discoveredModules];
  const processed = new Set();

  while (queue.length > 0) {
    const file = queue.shift();
    if (processed.has(file)) continue;
    processed.add(file);

    try {
      const res = await fetch(`${FRAMER_BASE}${file}`);
      if (!res.ok) {
        console.warn(`[HTTP ${res.status}] Could not fetch ${file}`);
        continue;
      }
      let content = await res.text();

      // Search for internal relative imports: from "./..." or import("./...") or import(`./...`)
      const regex = /(?:from\s*|import\s*\()\s*[`"']\.\/([^`"']+\.mjs)[`"']/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const dep = m[1];
        if (!processed.has(dep) && !queue.includes(dep)) {
          queue.push(dep);
        }
      }

      // Rebrand content
      content = rebrandContent(content);

      fs.writeFileSync(path.join(FRAMER_ASSETS_DIR, file), content, 'utf-8');
    } catch (err) {
      console.error(`Error processing module ${file}:`, err.message);
    }
  }

  console.log(`✓ Total Framer modules downloaded and rebranded: ${processed.size}`);
}

async function main() {
  console.log('--- REBUILDING ZERO -> ORBIX ---');
  await fetchSearchIndex();
  await downloadPages();
  await downloadModules();
  console.log('--- BUILD COMPLETE ---');
}

main().catch(err => {
  console.error('Fatal build error:', err);
  process.exit(1);
});
