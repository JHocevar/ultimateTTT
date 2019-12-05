import React from "react";
import Game from "./components/Game";
import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";

class App extends React.Component {
  constructor() {
    super();
    let boards = Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
      boards[i] = Array(9).fill(null);
    }
    this.state = {
      boards: boards,
      winners: Array(9).fill(null),
      xIsNext: true,
      currentBoard: -1,
      winner: null,
      useAi: true
    };
  }

  randomPlay() {
    if (this.state.winner) {
      return; // Dont try to make a move if there is already a winner
    }
    const validMoves = this.getValidMoves();
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    if (this.state.useAi && !this.state.xIsNext) {
      this.makeMove(move[0], move[1]);
    }
  }

  handleClick = (board, square) => {
    if (this.state.useAi && !this.state.xIsNext) {
      return;
    }
    this.makeMove(board, square);
  };

  makeMove(board, square) {
    const boards = this.state.boards.slice();
    const winners = this.state.winners.slice();
    let currBoard = this.state.currentBoard;
    if (calculateWinner(winners)) {
      // If there is a winner, dont accept clicks
      // If AI is active, dont accept clicks for 'O'
      return;
    }

    if (currBoard === board || currBoard === -1) {
      // We are playing on valid board
      if (boards[board][square]) {
        return;
      } else {
        boards[board][square] = this.state.xIsNext ? "X" : "O";

        for (let i = 0; i < 9; i++) {
          // Update the winners for each board
          if (winners[i]) {
            // If there is already a winner, do not change it
            continue;
          }
          winners[i] = calculateWinner(boards[i]);
        }

        if (this.isBoardFull(square)) {
          // If we filled up the baord, set current board to -1
          square = -1; // currentBoard gets set to square below
        }

        this.setState({
          boards: boards,
          winners: winners,
          xIsNext: !this.state.xIsNext,
          currentBoard: square
        });
      }
    }
  }

  isBoardFull(index) {
    const board = this.state.boards[index];
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        return false;
      }
    }
    return true;
  }

  getValidMoves() {
    const boards = this.state.boards;
    const currBoard = this.state.currentBoard;
    let validMoves = [];
    if (this.state.winner) {
      return; // There are no valid moves if there is a winner
    }

    if (currBoard === -1) {
      // We can choose any board to play on
      for (let boardNum = 0; boardNum < 9; boardNum++) {
        for (let squareNum = 0; squareNum < 9; squareNum++) {
          if (!boards[boardNum][squareNum]) {
            validMoves.push([boardNum, squareNum]);
          }
        }
      }
    } else {
      for (let squareNum = 0; squareNum < 9; squareNum++) {
        if (!boards[currBoard][squareNum]) {
          validMoves.push([currBoard, squareNum]);
        }
      }
    }
    return validMoves;
  }

  updateWinner() {
    const winner = calculateWinner(this.state.winners);
    if (winner && this.state.currentBoard !== -2) {
      // If we have a winner, and we havnet updated the currentBoard yet
      this.setState({
        winner: winner
      });
      this.setState({
        currentBoard: -2
      });
    }
  }

  componentDidUpdate() {
    this.updateWinner();
    this.randomPlay();
  }

  render() {
    return (
      <React.Fragment>
        <TitleBar winner={this.state.winner} xIsNext={this.state.xIsNext} />
        <SideBar />
        <div className="game">
          <Game
            onClick={this.handleClick}
            boards={this.state.boards}
            winners={this.state.winners}
            xIsNext={this.state.xIsNext}
            currentBoard={this.state.currentBoard}
            winner={this.state.winner}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
