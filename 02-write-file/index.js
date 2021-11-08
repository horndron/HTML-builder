const fs = require('fs');
const path = require('path');
const os = require('os');


const pathFile = path.join(__dirname, 'output.txt');
const { stdin, stdout } = process;



process.on('SIGINT', () => {
  stdout.write('\nGoodbye!');
  process.exit();
});


fs.access(pathFile, (error) => {
  if(error){
    fs.writeFile(
      pathFile,
      '',
      (error) => {
        if (error) console.error(error.message);
      }
    );
  }
});


stdout.write('Enter the text\n');


stdin.setEncoding('utf-8');
stdin.on('data', (data) => {
  let exitCode = `exit${os.EOL}`;
  if(data === exitCode) {
    stdout.write('\nGoodbye!');
    process.exit();
  }
  fs.appendFile(
    pathFile,
    data,
    (error) => {
      if (error) console.error(error.message);
    }
  );
   
  
});
