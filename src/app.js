import React from "react";
import Game from "./components/Game";
import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";
import MonteCarloTreeSearch from "./MonteCarloTreeSearch";
import GameState from "./GameState";

class App extends React.Component {
  constructor() {
    super();
    this.MCSearch = new MonteCarloTreeSearch();
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
      selectedState: "randomAI", // Options -- randomAI players smartAI simulate
      simulationMode: 1, // 1 - Random v Random  2 - Smart v Random
      paused: false,
      numSims: 0,
      numWinsX: 0,
      numWinsO: 0
    };
  }

  initializeState() {
    let boards = Array(9).fill(null);
    for (let i = 0; i < 9; i++) {
      boards[i] = Array(9).fill(null);
    }
    this.setState({
      boards: boards,
      winners: Array(9).fill(null),
      xIsNext: true,
      currentBoard: -1,
      winner: null,
      // selectedState: "randomAI", // Options -- randomAI players smartAI simulate
      // simulationMode: 1, // 1 - Random v Random  2 - Smart v Random
      paused: false
    });
    this.MCSearch = new MonteCarloTreeSearch(); // Reset the game tree to clear up memory
  }

  randomPlay() {
    const mode = this.state.selectedState;
    if (this.state.winner || mode === "players" || mode === "smartAI") {
      return; // Dont try to make a move if there is already a winner
    }
    const validMoves = this.getValidMoves();
    if (validMoves.length === 0) return; // We cannot make a move if there are no valid moves
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    if (
      (mode === "randomAI" && !this.state.xIsNext) ||
      (mode === "simulate" &&
        (this.state.simulationMode === 1 || !this.state.xIsNext))
    ) {
      this.makeMove(move[0], move[1]);
    }
  }

  smartPlay() {
    const mode = this.state.selectedState;
    if (
      this.state.winner ||
      mode === "players" ||
      mode === "randomAI" ||
      this.state.paused
    ) {
      return; // Dont try to make a move if ther is already a winner
    }
    if (
      (this.state.xIsNext &&
        mode === "simulate" &&
        this.state.simulationMode === 2) ||
      (mode === "smartAI" && !this.xIsNext)
    ) {
      let clonedGame = new GameState(this.state);
      this.MCSearch.runSearch(clonedGame); // Pass a clone of yourself
      let move = this.MCSearch.getBestMove(clonedGame);
      this.makeMove(move[0], move[1]);
    }
  }

  handleClick = (board, square) => {
    if (this.state.selectedState !== "players" && !this.state.xIsNext) {
      return;
    }
    this.makeMove(board, square);
  };

  handleChange = event => {
    this.setState({ selectedState: event.target.value });
  };

  handleOptionChange = event => {
    this.setState({ simulationMode: parseInt(event.target.value) });
  };

  handleReset = () => {
    this.initializeState();
  };

  handleStatReset = () => {
    console.log("resetting simulations");
    this.setState({
      numSims: 0,
      numWinsX: 0,
      numWinsO: 0
    });
  };

  handlePause = () => {
    this.setState({ paused: !this.state.paused });
  };

  makeMove(board, square) {
    const boards = this.state.boards.slice();
    const winners = this.state.winners.slice();
    let currBoard = this.state.currentBoard;
    if (calculateWinner(winners) || this.currentBoard === -2) {
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
      this.setState({
        winner: winner,
        currentBoard: -2
      });
    }

    if (this.isAllFull() && this.state.currentBoard !== -2) {
      this.setState({
        currentBoard: -2
      });
    }

    if (this.state.currentBoard !== -2) {
      for (let i = 0; i < 9; i++) {
        if (!this.state.winners[i] && !this.isBoardFull(i)) {
          return;
        }
      }
      this.setState({
        currentBoard: -2
      });
    }

    // Reset the board and clear the game tree when a simulation is finished
    if (this.state.selectedState === "simulate") {
      // We are running simulations, reset the board
      if (winner === "X") {
        this.setState({ numWinsX: this.state.numWinsX + 1 });
      } else if (winner === "O") {
        this.setState({ numWinsO: this.state.numWinsO + 1 });
      }
      this.setState({ numSims: this.state.numSims + 1 });

      this.initializeState(); // Reset the board
    }
  }

  componentDidUpdate() {
    this.updateWinner();
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.paused) return;
      this.smartPlay();
      this.randomPlay();
    }, 1);
  }

  render() {
    return (
      <div className="app">
        <TitleBar
          winner={this.state.winner}
          xIsNext={this.state.xIsNext}
          currentBoard={this.state.currentBoard}
        />
        <SideBar
          selectedState={this.state.selectedState}
          onChange={this.handleChange}
          onOptionChange={this.handleOptionChange}
          onReset={this.handleReset}
          onPause={this.handlePause}
          onStatReset={this.handleStatReset}
          simulationMode={this.state.simulationMode}
          paused={this.state.paused}
          numSims={this.state.numSims}
          numWinsX={this.state.numWinsX}
          numWinsO={this.state.numWinsO}
        />
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
      </div>
    );
  }
}

export default App;

export function calculateWinner(squares) {
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
