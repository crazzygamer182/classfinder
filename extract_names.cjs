const fs = require('fs');
const path = require('path');

const baseDir = path.join(
  'C:', 'Users', 'nirma', '.claude', 'projects',
  'C--Users-nirma-Documents-programming-projects-classf'
);

// Get all jsonl files
const allFiles = [];
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith('.jsonl')) {
      allFiles.push(fullPath);
    }
  }
}
walkDir(baseDir);

console.log('Found ' + allFiles.length + ' JSONL files\n');

for (const filePath of allFiles) {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
  const fname = path.basename(filePath);

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx] ? lines[idx].trim() : '';
    if (!line) continue;
    try {
      const data = JSON.parse(line);
      const msg = data.message || {};
      const content = msg.content || [];
      if (Array.isArray(content)) {
        for (const block of content) {
          const text = (block.type === 'text' ? block.text : '') || '';
          const thinking = (block.type === 'thinking' ? block.thinking : '') || '';
          const combined = text + thinking;

          // Look for actual name lists per page
          if (combined.includes('IMG_0767') && combined.includes('IMG_0768') && combined.length > 500) {
            console.log('=== ' + fname + ' LINE ' + (idx+1) + ' (' + block.type + ', len=' + combined.length + ') ===');
            console.log(combined.substring(0, 10000));
            console.log('---END---\n');
          }
          // Also look for structured name data
          if ((combined.includes('page_names') || combined.includes('namesByPage') || combined.includes('"IMG_076')) && combined.length > 200) {
            console.log('=== STRUCTURED: ' + fname + ' LINE ' + (idx+1) + ' (' + block.type + ', len=' + combined.length + ') ===');
            console.log(combined.substring(0, 10000));
            console.log('---END---\n');
          }
        }
      }

      // Also check if there's a file write with name mapping content
      if (data.toolUseResult && data.toolUseResult.type === 'create') {
        const content2 = data.toolUseResult.content || '';
        if (content2.includes('IMG_076') || content2.includes('IMG_077')) {
          console.log('=== FILE WRITE in ' + fname + ' LINE ' + (idx+1) + ' ===');
          console.log('File: ' + (data.toolUseResult.filePath || 'unknown'));
          console.log(content2.substring(0, 10000));
          console.log('---END---\n');
        }
      }
    } catch(e) {
      // skip
    }
  }
}
