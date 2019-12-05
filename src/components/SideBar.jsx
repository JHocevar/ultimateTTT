import React from "react";

class SideBar extends React.Component {
  render() {
    return (
      <nav className="float-left">
        <div className="sidebar-sticky">
          <div>This is the sidebar</div>
          <div className="radio">
            <label>
              <input type="radio" name="values" /> Value 1
            </label>
          </div>
          <div>
            <label className="radio">
              <input type="radio" name="values" /> Value 2
            </label>
          </div>
          <div>
            <label className="radio">
              <input type="radio" name="values" /> Value 3
            </label>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideBar;
