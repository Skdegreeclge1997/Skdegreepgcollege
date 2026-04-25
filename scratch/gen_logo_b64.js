const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo.jpeg');
const outputPath = path.join(__dirname, '..', 'lib', 'logo-base64.ts');

const bytes = fs.readFileSync(logoPath);
const b64 = bytes.toString('base64');

const tsContent = `// Auto-generated — college logo as base64 for Excel export\nexport const COLLEGE_LOGO_BASE64 = "${b64}";\n`;

fs.writeFileSync(outputPath, tsContent, 'utf-8');
console.log(`Done! Base64 length: ${b64.length} chars`);
