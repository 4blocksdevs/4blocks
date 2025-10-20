// scripts/copy-checklist-html.js
// Copies out/checklist/index.html to out/checklist.html after next export

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../out/checklist/index.html');
const dest = path.join(__dirname, '../out/checklist.html');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Copied checklist/index.html to checklist.html');
} else {
  console.error('Source file not found:', src);
  process.exit(1);
}
