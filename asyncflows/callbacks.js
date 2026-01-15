// aynchronous control flow.
//
// 1. callbacks
const { readFile, readdir, statSync } = require('node:fs');
// readFile(__filename, {
//   encoding: 'binary'
// }, (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
//   console.log('File content length:', data);
// })

readdir('.', (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  const print = (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log('File content length:', data.length);
  }
  const workFiles = files.filter(file => file.endsWith('.txt'))
    .map(file => ({
      name: file,
      size: statSync(file).size
    })).sort((a, b) => b.size - a.size)
    .map(f => f.name);

  // parallel
  readFile(workFiles[0], { encoding: 'utf-8' }, print)
  readFile(workFiles[1], { encoding: 'utf-8' }, print)
  readFile(workFiles[2], { encoding: 'utf-8' }, print)
  const data = []

  //serial
  readFile(workFiles[0], { encoding: 'utf-8' }, (err, data1) => {
    print(err, data1);
    readFile(workFiles[1], { encoding: 'utf-8' }, (err, data2) => {
      print(err, data2);
      readFile(workFiles[2], { encoding: 'utf-8' }, (err, data3) => {
        print(err, data3);
      })
    })
  })
})

import { promisify } from 'node:util';
const readFileAsync = promisify(readFile);

const promise = readFileAsync(__filename, { encoding: 'utf-8' });

promise.then(data => {
  console.log('File content length (promise):', data.length);
}).catch(err => {
  cosnole.error('Error reading file (promise):', err);
})


const { readFile: readFileProm, readdir: readDirProm } = reuire("node:fs/promises")


const files = (await readDirProm('.')).filter(file => file.endsWith('.txt'));

// serial
await readFileProm(files[0], { encoding: 'utf-8' }, { signal: AbortSignal.timeout(5000) })
await readFileProm(files[1], { encoding: 'utf-8' })
await readFileProm(files[2], { encoding: 'utf-8' })

const t = fetch("", {}, { signal: AbortSignal.timeout(5000) });

// parallel Promise.all

// promise.allsettled
const data = await Promise.all(files.map(file => readFileProm(file, { encoding: 'utf-8' })));
console.log('Files content lengths (Promise.all):', data.map(d => d.length));





