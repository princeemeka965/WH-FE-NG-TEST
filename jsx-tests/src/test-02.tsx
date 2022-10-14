/**
 * In the following React template, modify the component so that the counter correctly displays and it increments by one whenever the button is pressed.
 * You are free to add classes and styles, but make sure you leave the element ID's as they are.
 */

import React from "react";
import ReactDOM from "react-dom";

const style = {
  button: {
    backgroundColor: "rgb(0,0,0)",
    padding: "6px 12px",
    color: "#ffffff",
    cursor: "pointer",
  },
  text: {
    fontSize: "15px",
    fontWeight: "bold",
  },
};

type CounterState = {
  value: number;
};

class Counter extends React.Component<CounterState> {
  state: CounterState = {
    value: 0,
  };

  increaseCounter(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({ value: this.state.value + 1 });
    e.preventDefault();
  }

  render() {
    const { value } = this.state;

    return (
      <div id="mainArea">
        <p>
          button count: <span style={style.text}>{value}</span>
        </p>
        <button
          id="mainButton"
          style={style.button}
          onClick={(e) => this.increaseCounter(e)}
        >
          Increase
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Counter value={0} />, document.getElementById("test-02"));
