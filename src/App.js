import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Counter from "./Counter2";

// []
// [<li key=0>]
// [1, 0]
// [2, 1, 0]

const App = () => {
  const [counterArray, setCounterArray] = useState([]);

  const onClick = (e) => {
    e.preventDefault();
    setCounterArray([
      <li key={counterArray.length}>
        <Counter />
      </li>,
      ...counterArray,
    ]);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Add counter</button>
      <ul>{counterArray}</ul>
      <Chat room={"room" + counterArray.length} />
    </div>
  );
};

export default App;
