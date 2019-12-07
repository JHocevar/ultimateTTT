import React from "react";

class TitleBar extends React.Component {
  renderStatus() {
    const winner = this.props.winner;
    let status;
    if (winner) {
      status = "The winner is " + winner + "!";
    } else if (this.props.currentBoard === -2) {
      status = "The game was a tie";
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
