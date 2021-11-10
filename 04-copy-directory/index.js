const fs = require('fs');
const path = require('path');

const pathDirParent = path.join(__dirname, 'files');
const pathDirCopy = path.join(__dirname, 'files-copy');


fs.promises.rm(pathDirCopy, { recursive: true, force: true })
  .then(
    () => {
      return fs.promises.mkdir(pathDirCopy, { recursive: true});
    },

    (error) => {
      if (error) console.error(error.message);
    }
  )
  .then(
    () => {
      return copyFileRecursive(pathDirParent, pathDirCopy);
    },

    (error) => {
      if (error) console.error(error.message);
    }

  );
 





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






