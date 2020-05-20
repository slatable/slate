const fs = require('fs');
const path = require('path');
function readAliasForPackages() {
  const dirs = fs.readdirSync(path.resolve(process.cwd(), 'packages'), 'utf8');
  const out = {};
  dirs.forEach(dir => {
    const z = path.resolve(process.cwd(), 'packages', dir);
    const p = path.resolve(z, 'package.json');
    if (fs.existsSync(p)) {
      const pkg = require(p);
      out[pkg.name] = z;
    }
  })
  return out;
}
console.log(readAliasForPackages())