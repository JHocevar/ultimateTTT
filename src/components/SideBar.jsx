import React from "react";

/*
Renders the sidebar with the game options, simulation options and the simulation stats
*/
class SideBar extends React.Component {
  renderSimOptions() {
    if (this.props.selectedState === "simulate") {
      return (
        <div className="text-left">
          <h3>Sim Options</h3>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="options"
                value="1"
                checked={this.props.simulationMode === 1}
                onChange={value => this.props.onOptionChange(value)}
              />
              {" Random v Random"}
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="options"
                value="2"
                checked={this.props.simulationMode === 2}
                onChange={value => this.props.onOptionChange(value)}
              />
              {" Smart v Random"}
            </label>
          </div>
        </div>
      );
    }
  }

  renderPauseButton() {
    let message;
    if (this.props.paused) {
      message = "Unpause";
    } else {
      message = "Pause";
    }
    return (
      <div className="text-center">
        <button
          className={"btn btn-danger font-weight-bold text-dark m-2"}
          onClick={this.props.onPause}
        >
          {message}
        </button>
      </div>
    );
  }

  renderStats() {
    let ties = this.props.numSims - this.props.numWinsX - this.props.numWinsO;
    if (this.props.numSims > 0 || this.props.selectedState === "simulate")
      return (
        <div className="text-center">
          <p className="text-left">
            {"Number of Simulations: " + this.props.numSims}
          </p>
          <p className="text-left">
            {"Number of X Wins: " + this.props.numWinsX}
          </p>
          <p className="text-left">
            {" X Winrate: " +
              (this.props.numWinsX / this.props.numSims) * 100 +
              "%"}
          </p>
          <p className="text-left">
            {" Number of O wins: " + this.props.numWinsO}
          </p>
          <p className="text-left">
            {" O Winrate: " +
              (this.props.numWinsO / this.props.numSims) * 100 +
              "%"}
          </p>
          <p className="text-left">{" Number of Ties: " + ties}</p>
          <p className="text-left">
            {" Tie Rate: " + (ties / this.props.numSims) * 100 + "%"}
          </p>
          <button
            className="btn btn-danger font-weight-bold text-dark m-2"
            onClick={this.props.onStatReset}
          >
            Reset Statistics
          </button>
        </div>
      );
  }

  renderGameOptions() {
    return (
      <div className="sidebar-sticky text-left">
        <h2>Game Options</h2>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="values"
              value="randomAI"
              checked={this.props.selectedState === "randomAI"}
              onChange={value => this.props.onChange(value)}
            />
            {" Random A.I."}
          </label>
        </div>
        <div>
          <label className="radio">
            <input
              type="radio"
              name="values"
              value="smartAI"
              checked={this.props.selectedState === "smartAI"}
              onChange={value => this.props.onChange(value)}
            />
            {" Smart A.I."}
          </label>
        </div>
        <div>
          <label className="radio">
            <input
              type="radio"
              name="values"
              value="players"
              checked={this.props.selectedState === "players"}
              onChange={value => this.props.onChange(value)}
            />
            {" Player v Player"}
          </label>
        </div>
        <div>
          <label className="radio">
            <input
              type="radio"
              name="values"
              value="simulate"
              checked={this.props.selectedState === "simulate"}
              onChange={value => this.props.onChange(value)}
            />{" "}
            {" Simulate"}
          </label>
        </div>
      </div>
    );
  }

  render() {
    return (
      <nav className="float-left text-center ml-5">
        <div>
          <button
            className={"btn btn-danger font-weight-bold text-dark m-2"}
            onClick={this.props.onReset}
          >
            RESET
          </button>
          {this.renderGameOptions()}
          {this.renderSimOptions()}
          {this.renderPauseButton()}
          {this.renderStats()}
        </div>
      </nav>
    );
  }
}

export default SideBar;
