"use strict";

const y = 2;

function f() {
  let z = 3;
  console.log(this);
}

const g = f.bind({ z: 3 });

const h = g.bind({ y });

// const o = { x: 1, f };

g();
g.call({ y });
h();
