class Toto {
  method() {
    // …
    this; // instance of Toto
  }
}

const add = (a, b) => a + b;

button.onClick = (e) => {
  e.preventDefault();
};

const object = {
  x: 1,
  method() {
    // ": function" implicite
    this; // object
  },
  pasUneMethode: () => {
    // pas de this
  },
};
