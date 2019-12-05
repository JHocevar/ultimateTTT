import React from "react";

class SideBar extends React.Component {
  render() {
    return (
      <nav className="float-left ml-4">
        <button
          className={"btn btn-danger font-weight-bold text-dark m-2"}
          onClick={this.props.onReset}
        >
          RESET
        </button>

        <div className="sidebar-sticky">
          <div>This is the sidebar</div>
          <div className="radio">
            <label>
              <input
                type="radio"
                name="values"
                value="randomAI"
                checked={this.props.selectedState === "randomAI"}
                onChange={value => this.props.onChange(value)}
              />
              {" RandomAI"}
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
                value="paused"
                checked={this.props.selectedState === "paused"}
                onChange={value => this.props.onChange(value)}
              />{" "}
              {" Paused"}
            </label>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
