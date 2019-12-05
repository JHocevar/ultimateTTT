import React from "react";

class TitleBar extends React.Component {
  renderStatus() {
    const winner = this.props.winner;
    let status;
    if (winner) {
      status = "The winner is " + winner + "!";
    } else {
      status = "Current Player: " + (this.props.xIsNext ? "X" : "O");
    }

    return <h1 className="status text-center">{status}</h1>;
  }

  render() {
    return <div>{this.renderStatus()}</div>;
  }
}

export default TitleBar;
