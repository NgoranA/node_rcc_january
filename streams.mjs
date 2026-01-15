import { createReadStream } from 'node:fs';

const readStream = createReadStream('./NeetCode - Algorithms & Data Structures for Beginners.rar');
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString("base64").slice(0, 50) + '...'); // log first 50 chars of base64
});
readStream.on('end', () => {
  console.log('No more data to read.');
});


import { Readable } from 'node:stream';

const customStream = new Readable({
  read() {
    const data = ["Hello", "this", "is", "a", "custom", "readable", "stream", "!"]
    data.length ? this.push(data.shift()) : this.push(null);
  }
})

customStream.on('data', (chunk) => {
  console.log('Received chunk from custom stream:', chunk.toString());
});
customStream.on('end', () => {
  console.log('No more data in custom stream.');
});
