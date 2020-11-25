import { useState } from "react";

// Component = class || function
// Element = React.createElement()
// Instance = instanceof class || hidden instance
// DOMElement = handled by ReactDOM (virtual DOM)

// 1st render: no instance
// => create instance => state = []
// => useState(1) => state[0] = 1
//    count = 1
// => <button>1</button>
// click! => setCount(2) => state[0] = 2 => render
// 2nd render: existing instance
// => found instance => state = [2]
// => useState(1) => existing state => ignore value
//    count = 2
// => <button>2</button>

const Counter = () => {
  const [count, setCount] = useState(1);

  const onClick = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return <button onClick={onClick}>Func: {count}</button>;
};

export default Counter;
