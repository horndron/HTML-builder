const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');




fs.writeFile(
  path.join(__dirname, './project-dist', 'bundle.css'),
  '',
  (error) => {
    if (error) console.error(error.message);
  }
);


function reading(file){
  fs.readFile(path.join(styleFolder, file), 'utf-8', (err, data) => {
    if (err) console.error(err.message);

    fs.appendFile(
      path.join(__dirname, './project-dist', 'bundle.css'),
      data,
      (error) => {
        if (error) console.error(error.message);
      }
    );
  });
}


fs.readdir(styleFolder, (error, files) => {
  if (error) console.error(error.message);

  files.forEach((file) => {
    fs.stat(path.join(styleFolder, file), (err, stats) => {
      if (err) console.error(error.message);

      let filePath = path.parse(path.join(styleFolder, file));
      
      if(stats.isFile() && filePath.ext === '.css') {
        reading(file);
      }
    });
  });

  
});







