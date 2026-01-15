const assert = require('node:assert');

assert.ok(true); // checks for truthy value
// equallity check
assert.equal(actual, expected) //  checks for loose equality (==)
assert.strictEqual(actual, expected) // checks for strict equality (===)
// object deep equality check
assert.deepEqual(actual, expected) // checks for loose equality of object properties
assert.deepStrictEqual(actual, expected) // checks for strict equality of object properties

//error handling
assert.throws(fn) // expects function to throw an error
assert.doesNotThrow(fn) // expects function to not throw an error
assert.rejects(asyncFn) // expects async function to reject
assert.doesNotReject(asyncFn) // expects async function to not reject

assert.matches(string, regex) // checks if string matches regex
assert.ifError(value) // throws if value is truthy (used for error checking in callbacks)


const add = require('./fromsomewhere');

assert.strictEqual(add(2, 3), 5);

const obj = { id: 1, name: { first: 'David', second: 'Clements' } }
assert.deepEqual(obj, {
  id: 1,
  name: { first: 'David', second: 'Clements' }
})

const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw Error('inputs must be numbers')
  }
  return a + b
}

assert.throws(() => add('5', '5'), Error('inputs must be numbers'))
assert.doesNotThrow(() => add(5, 5))


pseudoReq('http://example.com', (err, data) => {
  assert.ifError(err)
})


assert.rejects(pseudoReq('http://error.com'), Error('network error'))




