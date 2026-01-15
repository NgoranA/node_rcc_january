// const { execSync } = require('node:child_process');
//
// const output = execSync("node -e \"console.log('Hello, World! from the child process')\"");
//
// execSync("notify-send  'Hello, World! from the child process'");
//
// console.log(`Output from child process: ${output.toString().trim()}`);

const { spawn } = require('node:child_process');


const child = spawn('node', ['-e', "console.log('Hello, World! from the child process')"], {
  env: { MY_VAR: 'some_value' },
  cwd: '/tmp',
  stdio: ["pipe", "pipe", "ignore"],
});


child.stdout.on('data', (data) => {
  console.log(`Output from child process: ${data.toString().trim()}`);
});

child.stderr.on('data', (data) => {
  console.error(`Error from child process: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
//

child.stdout.pipe(process.stdout);

const { execFile } = require('node:child_process');

execFile('node', ['-e', "console.log('Hello, World! from the child process')"], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error from child process: ${error}`);
    return;
  }
  console.log(`Output from child process: ${stdout.toString().trim()}`);
});













