const fs = require('fs');
const path = './src/data/properties.js';
let content = fs.readFileSync(path, 'utf8');

// Find the boundaries
// Block 1 (Iham): from "  {\r\n    id: 1," or "  {\n    id: 1," to just before "  {\r\n    id: 4,"
// Block 2 (The Cape): from "  {\r\n    id: 4," to just before "  {\r\n    id: 7,"

let ihamRegex = /  \{\r?\n    id: 1,/;
let capeRegex = /  \{\r?\n    id: 4,/;
let auraRegex = /  \{\r?\n    id: 7,/;

let ihamMatch = content.match(ihamRegex);
let capeMatch = content.match(capeRegex);
let auraMatch = content.match(auraRegex);

if (ihamMatch && capeMatch && auraMatch) {
    let prefix = content.substring(0, ihamMatch.index);
    let ihamBlock = content.substring(ihamMatch.index, capeMatch.index);
    let capeBlock = content.substring(capeMatch.index, auraMatch.index);
    let suffix = content.substring(auraMatch.index);

    fs.writeFileSync(path, prefix + capeBlock + ihamBlock + suffix);
    console.log("Swapped successfully");
} else {
    console.log("Could not find blocks");
}
