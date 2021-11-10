const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const pathDirParent = path.join(__dirname, 'assets');
const pathDirCopy = path.join(__dirname, './project-dist', 'assets');
const pathOutputFile = path.join(__dirname, './project-dist', 'style.css');

let html = '';
let regular = /{{(\w*)/g;


fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true })
  .then(
    () => {
      return fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    },

    (error) => {
      if (error) console.error(error.message);
    }
  )
  .then(
    () => {
      return fs.promises.mkdir(pathDirCopy, { recursive: true });
    },

    (error) => {
      if (error) console.error(error.message);
    }
  )
  .then(
    () => {
      createStyleFile(pathOutputFile);
      getTemplateNames();
    },

    (error) => {
      if (error) console.error(error.message);
    }

  )
  .then(
    () => {
      copyFileRecursive(pathDirParent, pathDirCopy);
      mergeFiles();
    },

    (error) => {
      if (error) console.error(error.message);
    }

  );





function createStyleFile(pathFile){
  fs.writeFile(
    pathFile,
    '',
    (error) => {
      if (error) console.error(error.message);
    }
  );
}

function createIndexHtml() {
  fs.writeFile(path.join(__dirname, './project-dist', 'index.html'), html, (err) => {
    if (err) console.error(err.message);
  });
}


function getTemplateNames(){
  fs.readFile(
    path.join(__dirname, 'template.html'), (error, data) => {
      if (error) console.error(error.message);
  
      html = html + data;
      
      let arr = html.match(regular);
      arr = arr.map(item => item.slice(2));

      replaceTemplate(arr);
    });


}


function replaceTemplate(arrTemplate) {
  console.log(arrTemplate);

  arrTemplate.forEach((name) => {
    let nameHtml = name + '.html';
    let stringReplace = '{{' + name + '}}';
    fs.readFile(path.join(__dirname, './components', nameHtml), 'utf8', (err, data) => {
      if (err) console.error(err.message);
  
      html = html.replace(stringReplace, data);

      createIndexHtml();
    });
  });
  
}



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

function mergeFiles() {
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
}



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
          fs.promises.mkdir(path.join(pathDirCopy, filePath.name), { recursive: true})
            .then (
              ()  => {
                return copyFileRecursive (path.join(pathDir, filePath.name), path.join(copyDir, filePath.name));
              },

              (error) => {
                if (error) console.error(error.message);
              }
            );
        }

      });

    });
    
  });
  
}