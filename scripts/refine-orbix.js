import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Rename ZeroWaitlist module if present
const oldWaitlistModule = path.join(ROOT_DIR, 'assets', 'framer', 'ZeroWaitlist.BJ2CGIp6.mjs');
const newWaitlistModule = path.join(ROOT_DIR, 'assets', 'framer', 'OrbixWaitlist.BJ2CGIp6.mjs');
if (fs.existsSync(oldWaitlistModule)) {
  fs.renameSync(oldWaitlistModule, newWaitlistModule);
  console.log('Renamed ZeroWaitlist.BJ2CGIp6.mjs -> OrbixWaitlist.BJ2CGIp6.mjs');
}

function refineString(content) {
  return content
    // Social links
    .replace(/https:\/\/x\.com\/zero_university/g, 'https://x.com/orbix_university')
    .replace(/https:\/\/www\.linkedin\.com\/company\/zero-about/g, 'https://www.linkedin.com/company/orbix-university')
    // CSS classes
    .replace(/zero-tweet-wrap/g, 'orbix-tweet-wrap')
    // Monogram & logo names
    .replace(/Logo zero green/g, 'Logo orbix green')
    .replace(/zero---Recruiter/g, 'orbix---Recruiter')
    .replace(/ZeroWaitlist\.BJ2CGIp6\.mjs/g, 'OrbixWaitlist.BJ2CGIp6.mjs')
    // Tracking & storage hooks
    .replace(/__zeroRdtHook/g, '__orbixRdtHook')
    .replace(/zero_rdt_signup/g, 'orbix_rdt_signup')
    .replace(/__zcLead/g, '__orbixLead')
    .replace(/__zcReg/g, '__orbixReg')
    // Content story rationale
    .replace(/start from zero\. Hence the name\./g, 'start from scratch and launch higher. Hence the name Orbix.')
    .replace(/start from zero\. Hence the name\./g, 'start from scratch and launch higher. Hence the name Orbix.')
    // Any remaining Zero text
    .replace(/\bZero\b/g, 'Orbix')
    .replace(/\bZERO\b/g, 'ORBIX');
}

function walkDir(dir, filterExt) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git'].includes(file)) continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(full, filterExt));
    } else if (filterExt.some(ext => file.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

console.log('Polishing all HTML and JS files...');
const files = walkDir(ROOT_DIR, ['.html', '.mjs', '.json', '.js']);

let touched = 0;
for (const file of files) {
  if (file.includes('scripts/build-orbix.js') || file.includes('scripts/refine-orbix.js')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  const refined = refineString(content);
  if (refined !== content) {
    fs.writeFileSync(file, refined, 'utf-8');
    touched++;
  }
}

console.log(`✓ Polished ${touched} files with 100% brand precision.`);
