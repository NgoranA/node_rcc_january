const { EventEmitter } = require('node:events');

const emitter = new EventEmitter();


class MyEmitter extends EventEmitter {
  constructor(options = {}) {
    super(options);
    this.name = options.name || 'default';
  }
  destroy(error) {
    if (error) {
      this.emit('error', error);
    }
    this.emit('close');
  }
}

const emitterInstance = new MyEmitter({ name: 'example' });

// INFO:
// eventInstance.emit('eventName', arg1, arg2, ...)
const os = require('node:os');
const user = os.userInfo().username;

// register an event listener for 'greet' event
const listener1 = (greeting, name) => {
  console.log(`${greeting}, ${name}!`);
}
emitter.on('greet', listener1);

emitter.on('greet', (greeting, name) => {
  console.log(`${greeting}!`);
})
emitter.on('greet', (greeting, name) => {
  console.log(`${name}!`);
})
emitter.prependOnceListener('greet', (greeting, name) => {
  console.log(`nothing`);
})
// emit the 'greet' event
emitter.emit('greet', "hello", user)

emitter.removeListener("greet", listener1)


emitter.on('error', (err) => {
  console.error('An error occurred:', err.message);
})

