const fs = require('fs');

const [_, __, file] = process.argv;

if (!file.endsWith('.sol')) {
  console.error('Works only on solidity files');
}

let lines = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }).split('\n');

let pragmaIndex;
let imports = [];

// Detect import lines
let index = 0;
while (index < lines.length) {
  const line = lines[index];

  if (line.startsWith('pragma ')) {
    pragmaIndex = index;
  }
  if (line.startsWith('import ')) {
    imports.push(line);
    lines = lines.slice(0, index).concat(lines.slice(index + 1));
  } else {
    index += 1;
  }
}
imports = imports.sort((a, b) => {
  return a.match(/".*"/g)[0] < b.match(/".*"/g)[0] ? -1 : 1;
});

// Sort import lines

let sortedImports = [];

for (const line of imports.filter(
  i => i.match(/".*"/g)[0].startsWith('"oz/') || i.match(/".*"/g)[0].startsWith('"oz-upgradeable/'),
)) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

for (const line of imports.filter(i => i.match(/".*"/g)[0].startsWith('"interfaces/'))) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

for (const line of imports.filter(i => i.match(/".*"/g)[0].startsWith('"forge-std/'))) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

for (const line of imports.filter(i => i.match(/".*"/g)[0].startsWith('"mock/'))) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

for (const line of imports.filter(i => i.match(/".*"/g)[0].startsWith('"contracts/'))) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

// Imports to place in a separate block at the end
const finalImportsRegex = ['/Constants.sol', '/Errors.sol', '/Storage.sol'];
const finalImports = [];
for (const reg of finalImportsRegex) {
  for (const line of imports.filter(i => !sortedImports.includes(i))) {
    if (line.includes(reg)) {
      finalImports.push(line);
      const index = imports.indexOf(line);
      // Delete import
      imports = imports.slice(0, index).concat(imports.slice(index + 1));
    }
  }
}
console.log(finalImports);

for (const line of imports.filter(i => !sortedImports.includes(i))) {
  sortedImports.push(line);
}
if (sortedImports.length > 0 && sortedImports[sortedImports.length - 1] != '') sortedImports.push('');

sortedImports = sortedImports.concat(finalImports);

while (sortedImports[sortedImports.length - 1] == '') sortedImports.pop();

// Rebuild file

const beforePragma = lines.slice(0, pragmaIndex + 2);
let afterPragma = lines.slice(pragmaIndex + 2);
while (afterPragma[0] == '' && afterPragma[1] == '') afterPragma = afterPragma.slice(0, 1).concat(afterPragma.slice(2));

lines = beforePragma.concat(sortedImports, afterPragma);

fs.writeFileSync(
  file,
  lines.reduce((prev, curr) => prev + curr + '\n', ''),
);
