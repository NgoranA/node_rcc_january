'use strict'
const add = require('../add')

test('throw when inputs are not numbers', () => {
  expect(() => add('5', '5')).toThrow(Error('inputs must be numbers'))
  expect(() => add(5, '5')).toThrow(Error('inputs must be numbers'))
  expect(() => add('5', 5)).toThrow(Error('inputs must be numbers'))
  expect(() => add({}, null)).toThrow(Error('inputs must be numbers'))
})

test('adds two numbers', () => {
  expect(add(5, 5)).toStrictEqual(10)
  expect(add(-5, 5)).toStrictEqual(0)
})
