import React from "react";
import Board from "./Board";
var classNames = require("classnames");

class Game extends React.Component {
  renderBoard(i) {
    return (
      <Board
        value={this.props.boards[i]}
        onClick={p => this.props.onClick(i, p)}
        currentBoard={this.props.currentBoard}
        id={i}
        winners={this.props.winners}
        className={classNames({
          "winner-x": true
        })}
      />
    );
  }

  render() {
    return (
      <div className="super-board">
        <div className="super-board-row">
          {this.renderBoard(0)}
          {this.renderBoard(3)}
          {this.renderBoard(6)}
        </div>
        <div className="super-board-row">
          {this.renderBoard(1)}
          {this.renderBoard(4)}
          {this.renderBoard(7)}
        </div>
        <div className="super-board-row">
          {this.renderBoard(2)}
          {this.renderBoard(5)}
          {this.renderBoard(8)}
        </div>
      </div>
    );
  }
}

export default Game;
