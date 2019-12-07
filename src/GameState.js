import { calculateWinner } from "./app";

// Similar to app, runs the game but with less features, for storing the state in
// MonteCarloTreeSearch class
class GameState {
  constructor(state) {
    this.state = JSON.parse(JSON.stringify(state));
  }

  makeMove(move) {
    let board = move[0];
    let square = move[1];
    const boards = this.state.boards.slice();
    const winners = this.state.winners.slice();
    let currBoard = this.state.currentBoard;
    if (calculateWinner(winners)) {
      // If there is a winner, dont accept clicks
      // If the game is paused by user, dont accept moves

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

        this.state.boards = boards;
        this.state.winners = winners;
        this.state.xIsNext = !this.state.xIsNext;
        this.state.currentBoard = square;
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

  isAllFull() {
    for (let i = 0; i < 9; i++) {
      if (!this.isBoardFull(i)) {
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
      return []; // There are no valid moves if there is a winner
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
      if (currBoard === -2) return []; // There are no valid moves if the board is -2
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
      this.state.winner = winner;
      this.state.currentBoard = -2;
    }

    if (this.isAllFull() && this.state.currentBoard !== -2) {
      this.state.currentBoard = -2;
    }
  }

  isPlayer(player) {
    if (player === "X" && this.state.xIsNext) {
      return true;
    }
    if (player === "O" && !this.state.xIsNext) {
      return true;
    }
    return false;
  }
}

export default GameState;
