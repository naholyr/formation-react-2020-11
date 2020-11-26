import React from "react";

class Counter2 extends React.Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    console.log("Counter(class)#componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Counter(class)#componentDidUpdate", { prevProps, prevState });
  }

  componentWillUnmount() {
    console.log("Counter(class)#componentWillUnmount");
  }

  render() {
    const onClick = (e) => {
      e.preventDefault();
      this.setState({
        count: this.state.count + 1,
      });
    };

    return <button onClick={onClick}>Class: {this.state.count}</button>;
  }
}

export default Counter2;
