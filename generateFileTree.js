const fs = require('fs');
const path = require('path');

const getFileTree = (dir, prefix = '') => {
  const files = fs.readdirSync(dir);
  let result = '';

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    const isLast = index === files.length - 1;

    if (stats.isDirectory()) {
      result += `${prefix}${isLast ? '└── ' : '├── '}${file}/\n`;
      result += getFileTree(fullPath, `${prefix}${isLast ? '    ' : '│   '}`);
    } else {
      result += `${prefix}${isLast ? '└── ' : '├── '}${file}\n`;
    }
  });

  return result;
};

const appDir = path.join(__dirname, 'app');
console.log(getFileTree(appDir));
