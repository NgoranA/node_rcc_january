const { readFile } = require('node:fs');

readFile('IMG_0114.PNG', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('Base64 Encoded Data:', data);
});


