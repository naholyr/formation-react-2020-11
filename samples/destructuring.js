// Destructuring

const options = { x: 1, y: 2, z: 3 };

function doSomething(options) {
  // const x = options.x
  // const y = options.y
  // const z = options.z

  const { x, y, z } = options;

  //...
}

const array = [1, 2, 3, 4];
const [a, b] = array; // a = 1, b = 2
const [a, b, , d] = array; // a = 1, b = 2, d = 4

// Rest operator

const [a, ...rest] = array; // a = 1, rest = [2, 3, 4]
const a = array[0];
const rest = array.slice(1);

const [, ...rest] = array; // rest = [2, 3, 4]
const rest = array.slice(1);

const { x, ...rest } = options; // x = 1, rest = { y: 2, z: 3 }

function foo(a, ...args) {
  // foo(1, 2, 3) => a = 1, args = [2, 3]
}

// Short hand properties

const x = 1;
const y = 2;
const z = 3;
const o = { x, y, z, w: 4 };

// Spread operator

const a = 1;
const rest = [2, 3, 4];
const array = [a, ...rest]; // [1, 2, 3, 4]

const x = 1;
const o = { y: 2, z: 3 };
const object = { x, ...o }; // { x: 1, y: 2, z: 3 }

foo(...array); // foo(1, 2, 3, 4)

// Default values

function foo(a, b = 2) {
  // foo() => a = undefined, b = 2
  // foo(1) => a = 1, b = 2
  // foo(1, "truc") => a = 1, b = "truc"
}

const [a, , , , e = 5] = [1, 2, 3]; // a = 1, e = 5
const { x, w = 5 } = o; // x = 1, w = 5

function foo({ x, y, z, w = 5 }) {
  // do something with x, y, z
}
