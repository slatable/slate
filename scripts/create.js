const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

prompt([{
  type: 'input',
  name: 'project',
  message: '请输入项目名称'
}]).then(data => {
  const dir = createProjectDir(data.project);
  createTypeScriptConfigFile(dir);
  createPackageFile(dir, data.project);
  createReadme(dir, data.project);
  const src = createDir(dir, 'src');
  const test = createDir(dir, '__tests__');
  createIndexFile(src);
  createTestFile(test, data.project);
});

function createProjectDir(name) {
  const dir = path.resolve(process.cwd(), 'packages', name);
  fs.mkdirSync(dir);
  return dir;
}

function createTypeScriptConfigFile(dir) {
  const template = {
    "compilerOptions": {
      "target": "es5",
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      "allowJs": true,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react",
      "experimentalDecorators":true,
      "emitDecoratorMetadata":true,
      "downlevelIteration":true,
      "strictNullChecks": false,
    },
    "include": ["src"]
  }
  fs.writeFileSync(path.resolve(dir, 'tsconfig.json'), JSON.stringify(template, null, 2), 'utf8');
}

function createPackageFile(dir, project) {
  const template = {
    "name": "@slatable/" + project,
    "version": "1.0.0",
    "description": "slatable " + project,
    "author": "",
    "homepage": "https://github.com/slatable/core",
    "license": "MIT",
    "main": "dist/index.js",
    "directories": {
      "lib": "src",
      "test": "__tests__"
    },
    "files": [
      "dist"
    ],
    "scripts": {
      "build": "rm -rf dist && tsc -d"
    }
  }
  fs.writeFileSync(path.resolve(dir, 'package.json'), JSON.stringify(template, null, 2), 'utf8');
}

function createReadme(dir, project) {
  template = `# \`${project}\`

  > TODO: description
  
  ## Usage
  
  \`\`\`
  const container = require('@slatable/${project}');
  
  // TODO: DEMONSTRATE API
  \`\`\``;
  fs.writeFileSync(path.resolve(dir, 'README.md'), template, 'utf8');
}

function createDir(dir, name) {
  const _dir = path.resolve(dir, name);
  fs.mkdirSync(_dir);
  return _dir;
}

function createIndexFile(src) {
  fs.writeFileSync(path.resolve(src, 'index.ts'), `export const test = 1;`, 'utf8');
}

function createTestFile(test, project) {
  fs.writeFileSync(path.resolve(test, project + '.test.ts'), `import * as core from '../src';

  describe('core', () => {
      it('needs tests');
  });
  `, 'utf8');
}