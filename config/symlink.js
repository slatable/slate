const fs = require('fs');
const path = require('path');
const createSymlink = require('@lerna/create-symlink');
const cwd = path.resolve(__dirname, '../packages');
module.exports = function() {
  const packages = fs.readdirSync(cwd, 'utf8');
  packages.forEach(pkg => {
    const pkgdir = path.resolve(cwd, pkg);
    const jsonfile = path.resolve(pkgdir, 'package.json');
    if (fs.existsSync(jsonfile)) {
      const pkgExports = require(jsonfile);
      const pkgname = pkgExports.name;
      const pkgdic = path.resolve(__dirname, '../node_modules', pkgname.split('/')[0]);
      const execfile = path.resolve(__dirname, '../node_modules', pkgname);
      if (!fs.existsSync(pkgdic)) fs.mkdirSync(pkgdic);
      createSymlink(pkgdir, execfile, 'exec');
    }
  })
}