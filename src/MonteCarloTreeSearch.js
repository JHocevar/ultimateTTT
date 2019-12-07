import GameState from "./GameState";

class MonteCarloTreeSearch {
  constructor() {
    this.nodes = {};
    this.currNode = null;
  }

  initialize(state) {
    if (
      this.nodes[JSON.stringify(state.state)] === null ||
      this.nodes[JSON.stringify(state.state)] === undefined
    ) {
      let newNode = new MCNode(null, new GameState(state.state), 0);
      this.currNode = newNode;
      this.nodes[JSON.stringify(state.state)] = newNode;
    } else {
      this.currNode = this.nodes[JSON.stringify(state.state)];
    }
  }

  runSearch(state) {
    this.initialize(state);

    let endTime = new Date().getTime() + 1000;

    let numSims = 0;
    while (new Date().getTime() < endTime) {
      this.select(state);

      this.expand();

      let winner = this.simulate();

      this.backPropogate(winner);
      numSims++;
    }
    console.log("Number of sims ran: ", numSims);
  }

  getBestMove(state) {
    let bestMove;
    let bestRate = -Infinity;
    this.currNode = this.nodes[JSON.stringify(state.state)];
    for (let key in this.currNode.children) {
      let child = this.currNode.children[key];
      let rate = child.numWins / child.numSims;
      if (rate > bestRate) {
        bestRate = rate;
        bestMove = child.move;
      }
    }
    if (bestMove === undefined) {
      let validMoves = state.getValidMoves();
      bestMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    }
    return bestMove;
  }

  select(state) {
    this.currNode = this.nodes[JSON.stringify(state.state)];
    while (!this.currNode.isLeafNode() && this.currNode.isFullyExpanded()) {
      let bestChild;
      let bestUCB1 = -Infinity;
      for (let key in this.currNode.children) {
        let child = this.currNode.children[key];
        if (child.getUCB1() > bestUCB1) {
          bestUCB1 = child.getUCB1();
          bestChild = child;
        }
      }
      this.currNode = bestChild;
    }
  }

  expand() {
    let validMoves = this.currNode.state.getValidMoves();
    if (validMoves.length === 0) return;

    let loop = false;
    let move;
    do {
      loop = false;
      move = validMoves[Math.floor(Math.random() * validMoves.length)];
      for (let key in this.currNode.children) {
        let child = this.currNode.children[key];
        if (child.move === move) {
          loop = true;
        }
      }
    } while (loop);

    let newState = new GameState(this.currNode.state.state);
    newState.makeMove(move);
    let newNode = new MCNode(this.currNode, newState, move);
    this.currNode.children[JSON.stringify(newState.state)] = newNode;
    this.nodes[JSON.stringify(newState.state)] = newNode;
    this.currNode = newNode;
  }

  simulate() {
    let state = new GameState(this.currNode.state.state);
    let winner = state.state.winner;
    while (state.currentBoard !== -2) {
      let validMoves = state.getValidMoves();
      if (validMoves.length === 0) break;
      let move = validMoves[Math.floor(Math.random() * validMoves.length)];
      state.makeMove(move);
      state.updateWinner();
      winner = state.state.winner;
    }
    return winner;
  }

  backPropogate(winner) {
    while (this.currNode !== null && this.currNode !== undefined) {
      this.currNode.numSims++;
      if (winner === "") {
        this.currNode.numWins += 0.5;
      } else if (!this.currNode.state.isPlayer(winner)) {
        this.currNode.numWins++;
      }
      this.currNode = this.currNode.parent;
    }
  }
}

export default MonteCarloTreeSearch;

class MCNode {
  constructor(parent, state, move) {
    this.parent = parent;
    this.state = state;
    this.move = move;
    this.children = {};
    this.numWins = 0;
    this.numSims = 0;
  }

  isLeafNode() {
    if (Object.keys(this.children).length === 0) return true;
    return false;
  }

  isFullyExpanded() {
    if (Object.keys(this.children).length === this.state.getValidMoves().length)
      return true;
    return false;
  }

  getUCB1() {
    return (
      this.numWins / this.numSims +
      Math.sqrt(2 * Math.log(this.parent.numSims / this.numSims))
    );
  }
}
