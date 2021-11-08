const fs = require('fs');
const path = require('path');

const pathDirParent = path.join(__dirname, 'files');
const pathDirCopy = path.join(__dirname, 'files-copy');


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
          // path.join(pathDir, filePath.name);
          // path.join(copyDir, filePath.name);
          createFolder(path.join(copyDir, filePath.name));
          copyFileRecursive (path.join(pathDir, filePath.name), path.join(copyDir, filePath.name));
        }

      });

    });
    
  });
  
}






