import React, { Component } from "react";
import "./Cadran.css";

export class Separator extends Component {
  render() {
    return (
      <div>
        <div className="left-street">
          <div className="street-line"></div>
        </div>
        <div className="top-street">
          <div className="street-line"></div>
        </div>
        <div className="right-street">
          <div className="street-line"></div>
        </div>
        <div className="bottom-street">
          <div className="street-line"></div>
        </div>
      </div>
    );
  }
}
