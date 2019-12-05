import React from "react";
var classNames = require("classnames");

function Square(props) {
  return (
    <button
      className={classNames({
        square: true,
        valid: props.id === props.currBoard || props.currBoard === -1,
        "winner-x": props.winners[props.id] === "X",
        "winner-o": props.winners[props.id] === "O"
      })}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
