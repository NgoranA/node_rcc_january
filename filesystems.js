// const { join, parse, basename, dirname, extname } = require('node:path');
// __filename // the absolute path of the current module file
// __dirname
//
// console.log('Current module file path:', __filename);
// console.log('Current module directory path:', __dirname);
//
//
// // key
// // 1. path joining path.join
// // path.resolve 
// // path.relative 
// //
// // path.normalize . ..
// // path.parse path.format
//
// const outputFilePath = join(__dirname, 'package.json');
// console.log('Joined path to package.json:', outputFilePath);
//
// console.log('parsed __filename', parse(__filename))
// console.log("Basename", basename(__filename))
// console.log("Dirnaem", dirname(__filename))
// console.log("Extension", extname(__filename))
//
//
// // 1. Synchronous APIs // they block execution until the operation is completed.
// // 2. Callback -based APIs
// // 3. Promise-Bases APIs
// // 4. Stream Based APIs
// //
// //
// //
// //Synchronous
// const { readFileSync, writeFileSync } = require("node:fs")
//
// const contents = readFileSync(__filename, { encoding: "utf8" })
// console.log(contents)
//
// // writeFileSync(<where to write the contents>, <what are the contents>)
// // writeFileSync(join(<from where do we go?>, <what is the name of the file?>))
// writeFileSync(join(__dirname, 'output.txt'), contents.toUpperCase())
//
//
// // asynchronous(callback-based)
//
// const { readFile, writeFile } = require("node:fs")
//
// // readFile(<what do you want to read>, <{are there any other options? like encoding}>, (err, data) => what do you want to do with the error and the data)
//
// readFile(__filename, {}, (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err)
//     return
//   }
//   writeFile(join(__dirname, 'output-async.txt'), data.toLowerCase(), (err) => {
//     if (err) {
//       console.error("Error writing file:", err)
//       return
//     }
//     console.log("File written successfully")
//
//   })
//
// })
//
// const { readFile: readFileProm, writeFile: writeFileProm } = require('fs/promises');
// const { join } = require('path');
//
// async function run() {
//   try {
//     const contents = await readFileProm(__filename, { encoding: 'utf8' });
//     await writeFileProm(join(__dirname, 'out.txt'), contents.toUpperCase());
//     console.log('File written successfully (promise)');
//   } catch (err) {
//     console.error(err);
//   }
// }
//
// run();
//
//
// 'use strict';
// const { pipeline } = require('stream');
// const { createReadStream, createWriteStream } = require('fs');
// const { join } = require('path');
//
// pipeline(
//   createReadStream(__filename),
//   createWriteStream(join(__dirname, 'out.txt')),
//   (err) => {
//     if (err) console.error(err);
//     else console.log('File copy complete');
//   }
// );
//
//
// 'use strict';
// const { pipeline, Transform } = require('stream');
// const { createReadStream, createWriteStream } = require('fs');
// const { join } = require('path');
//
// // Create a transform stream that upper-cases incoming data
// const createUppercaseStream = () => {
//   return new Transform({
//     transform(chunk, enc, next) {
//       const uppercased = chunk.toString().toUpperCase();
//       next(null, uppercased);
//     }
//   });
// };
//
// pipeline(
//   createReadStream(__filename),
//   createUppercaseStream(),
//   createWriteStream(join(__dirname, 'out.txt')),
//   (err) => {
//     if (err) console.error(err);
//     else console.log('Uppercasing and writing complete');
//   }
// );
//
// 'use strict';
// const { readdirSync, readdir } = require('fs');
// const { readdir: readdirProm } = require('fs/promises');
//
// // Synchronous method
// try {
//   const filesSync = readdirSync(__dirname);
//   console.log('Synchronous:', filesSync);
// } catch (err) {
//   console.error(err);
// }
//
// // Callback-based method
// readdir(__dirname, (err, files) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Callback:', files);
// });
//
// // Promise-based method
// async function listFiles() {
//   try {
//     const files = await readdirProm(__dirname);
//     console.log('Promise:', files);
//   } catch (err) {
//     console.error(err);
//   }
// }
// listFiles();



// 'use strict';


'use strict';
const { join, resolve } = require('path');
const { watch, readdirSync, statSync } = require('fs');

const cwd = resolve('.');
const files = new Set(readdirSync('.'));

watch('.', (eventType, filename) => {
  try {
    const { ctimeMs, mtimeMs } = statSync(join(cwd, filename));
    if (!files.has(filename)) {
      eventType = 'created';
      files.add(filename);
    } else {
      eventType = ctimeMs === mtimeMs ? 'content-updated' : 'status-updated';
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      files.delete(filename);
      eventType = 'deleted';
    } else {
      console.error(err);
    }
  } finally {
    console.log(`Detected ${eventType} on ${filename}`);
  }
});
