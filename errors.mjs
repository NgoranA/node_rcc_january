
function doTask(amount) {

  if (typeof amount !== 'number') {
    throw new TypeError('The amount must be a number');
  }
  if (amount < 0) {
    throw new RangeError('The amount must be non-negative');
  }

  if (amount % 2 !== 0) {
    throw new OddNumberError('amount');
  }

  return amount * 2;
}
//
// doTask('a');

// native error constructors

// 1. Error (Generic error)
// 2. TypeError (Invalid type)
// 3. RangeError (Out of range)
// 4. ReferenceError (Invalid reference)
// 5. SyntaxError (Syntax issues)
// 6. URIError (Invalid URI)

// Error('This is a generic error', {
//
// });

// standard HTTP errors
// 100-199: 'Continue',
// 200-299: 'Success',
// 300-399: 'Redirection',
// 400-499: 'Client Error',
// 500-599: 'Server Error',


// custom errors

class OddNumberError extends Error {
  constructor(varname = "") {
    super(`${varname} must be an even number`);
    this.name = "OddNumberError";
    this.code = "ERR_ODD_NUMBER";
  }
}



try {
  doTask(3);
} catch (err) {
  if (err instanceof OddNumberError) {
    console.error(`Custom Error Caught: ${err.message} (code: ${err.code})`);
  } else {
    console.error(`Error Caught: ${err.message}`);
  }
}

function doTaskAsync(amount) {
  return new Promise((resolve, reject) => {
    if (typeof amount !== 'number') {
      reject(new TypeError('The amount must be a number'));
    } else if (amount < 0) {
      reject(new RangeError('The amount must be non-negative'));
    } else if (amount % 2 !== 0) {
      reject(new OddNumberError('amount'));
    }
    resolve(amount * 2);
  });
}

// classic promise handling
doTaskAsync(5).then(result => {
  console.log(`Result: ${result}`);
}).catch(err => {
  if (err instanceof OddNumberError) {
    console.error(`Custom Async Error Caught: ${err.message} (code: ${err.code})`);
  } else {
    console.error(`Async Error Caught: ${err.message}`);
  }
});

// classic async/await
async function runAsyncTask() {
  try {
    const result = await doTaskAsync(7);
    console.log(`Async Result: ${result}`);
  } catch (err) {
    if (err instanceof OddNumberError) {
      console.error(`Custom Async/Await Error Caught: ${err.message} (code: ${err.code})`);
    } else {
      console.error(`Async/Await Error Caught: ${err.message}`);
    }
  }
}

runAsyncTask();

async function runAsync2() {
  const result = await doTaskAsync(10)
  return result;
}

// error propagation
runAsync2().catch(err => {
  console.error(`Unhandled Error: ${err.message}`);
});

// callbacks with errors
function doTaskCallback(amount, callback) {
  if (typeof amount !== 'number') {
    return callback(new TypeError('The amount must be a number'));
  }
  if (amount < 0) {
    return callback(new RangeError('The amount must be non-negative'));
  }
  if (amount % 2 !== 0) {
    return callback(new OddNumberError('amount'));
  }
  callback(null, amount * 2);
}
doTaskCallback(11, (err, result) => {
  if (err) {
    if (err instanceof OddNumberError) {
      console.error(`Custom Callback Error Caught: ${err.message} (code: ${err.code})`);
    } else {
      console.error(`Callback Error Caught: ${err.message}`);
    }
  }
  console.log(`Callback Result: ${result}`);
});





