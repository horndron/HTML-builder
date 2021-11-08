const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, 'secret-folder');

fs.readdir(currentPath, (error, files) => {
  if(error) return console.error(error.message);

  files.forEach((file) => {
    fs.stat(path.join(currentPath, file), (error, stats) => {
      if(error) return console.error(error.message);

      // console.log('Path is file:', stats.isFile());
      if(stats.isFile()) {
        const pathParse = path.parse(path.join(currentPath, file));
        console.log(`${pathParse.name} - ${pathParse.ext.slice(1)} - ${stats.size / 1000}kb`);
      }

    });
  });
});

