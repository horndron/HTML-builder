const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const pathDirParent = path.join(__dirname, 'assets');
const pathDirCopy = path.join(__dirname, './project-dist', 'assets');

let html = '';
let regular = /{{(\w*)/g;
let templateNames;








fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });



fs.writeFile(
  path.join(__dirname, './project-dist', 'style.css'),
  '',
  (error) => {
    if (error) console.error(error.message);
  }
);


function replaceTemplate() {
  templateNames.forEach((name) => {
    let nameHtml = name + '.html';
    let stringReplace = '{{' + name + '}}';
    fs.readFile(path.join(__dirname, './components', nameHtml), 'utf8', (err, data) => {
      if (err) console.error(err.message);
  
      html = html.replace(stringReplace, data);
      createIndexHtml();
    });
  });
  
}


function createIndexHtml() {
  fs.writeFile(path.join(__dirname, './project-dist', 'index.html'), html, (err) => {
    if (err) console.error(err.message);
  });
}



fs.readFile(
  path.join(__dirname, 'template.html'), (error, data) => {
    if (error) console.error(error.message);

    html = html + data;
    
    templateNames = html.match(regular);
    templateNames = templateNames.map(item => item.slice(2));

    replaceTemplate();
  });








function reading(file){
  fs.readFile(path.join(styleFolder, file), 'utf-8', (err, data) => {
    if (err) console.error(err.message);

    fs.appendFile(
      path.join(__dirname, './project-dist', 'style.css'),
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



fs.writeFile(
  path.join(__dirname, './project-dist', 'style.css'),
  '',
  (error) => {
    if (error) console.error(error.message);
  }
);


function readingFile(file){
  fs.readFile(path.join(styleFolder, file), 'utf-8', (err, data) => {
    if (err) console.error(err.message);

    fs.appendFile(
      path.join(__dirname, './project-dist', 'style.css'),
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
        readingFile(file);
      }
    });
  });
});


function createFolder(pathDir) {
  fs.promises.mkdir(pathDir, { recursive: true }, (error) => {
    if (error) console.error(error.message);
  });
}

async function deleteCopyFolder(folder) {
  await fs.promises.rmdir(folder, { recursive: true });
  await fs.promises.mkdir(folder, { recursive: true });

  copyFileRecursive (pathDirParent, pathDirCopy);
}


fs.access(pathDirCopy, (error)=> {
  if (error) {
    createFolder(pathDirCopy);
    copyFileRecursive (pathDirParent, pathDirCopy);
  } else {
    deleteCopyFolder(pathDirCopy);
  }
});
 

function copyFileRecursive (pathDir, copyDir) {

  fs.readdir(pathDir, (error, files) => {
    if (error) console.error(error.message);
  
    files.forEach(file => {
  
      fs.stat(path.join(pathDir, file), (error, stats) => {
        if(error) console.error(error.message);
        
        let filePath = path.parse(path.join(pathDir, file));

        if(stats.isFile()) {
          fs.copyFile(path.join(pathDir, file), path.join(copyDir, file), (error) => {
            if (error) console.error(error.message);
          });
        } else {
          createFolder(path.join(copyDir, filePath.name));
          copyFileRecursive (path.join(pathDir, filePath.name), path.join(copyDir, filePath.name));
        }

      });

    });
    
  });
  
}

