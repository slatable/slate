const fs = require('fs');
const path = require('path');
const createSymlink = require('@lerna/create-symlink');

const src = path.resolve(__dirname, 'packages/slate');
const dir = path.resolve(__dirname, 'node_modules', '@slatable');
const dist = path.resolve(dir, 'slate');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

createSymlink(src, dist, 'exec');

console.log(require('@slatable/slate'))