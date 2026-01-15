const user = {
  name: "Alice",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Wonderland",
    zip: "12345"
  }
}

console.log(`User ${user.name} lives at ${user.address.street}, ${user.address.city}, ${user.address.zip}.`);


const greet = function (name) {
  return `Hello, ${name}!`;
}
console.log(greet(user.name));

function factory() {
  return function doSomething() {
    console.log("Doing something...");
  }
}

const action = factory();
action();

setTimeout(function () {
  consolele.log("Timeout executed after 1 second");
}, 1000);


const object = {
  id: 1,
  fn: function () {
    console.log(this.id);
  }
}
object.fn();

const object2 = { id: 2, fn: object.fn };
object2.fn();


// prototypal inheritance 

const wolf = {
  howl: function () {
    console.log(this.name + "Awooo!");
  }
}

const dog = Object.create(wolf, {
  woof: {
    value: function () {
      console.log(this.name + "Woof!");
    }
  }
});


const jack = Object.create(dog, {
  name: { value: "Jack the dog, " }
});


jack.howl();
jack.woof();


const util = require('node:util');

function Wolf(name) {
  this.name = name;
}

Wolf.prototype.howl = function () {
  console.log(this.name + "Awooo!");
}


function Dog(name) {
  Wolf.call(this, name + " the dog");
}


Dog.prototype.woof = function () {
  console.log(this.name + "Woof!");
}

util.inherits(Dog, Wolf);

const buggy = new Dog("Buggy, ");

buggy.howl();
buggy.woof()



class WolfClass {
  constructor(name) {
    this.name = name;
  }
  howl() {
    console.log(this.name + "Awooo!");
  }
}

class DogClass extends WolfClass {
  constructor(name) {
    this.name = name + " the dog";
    super(this.name);
  }
  woof() {
    console.log(this.name + "Woof!");
  }
}

const firstInstance = new DogClass("First instance, ");
firstInstance.howl();
firstInstance.woof();




































