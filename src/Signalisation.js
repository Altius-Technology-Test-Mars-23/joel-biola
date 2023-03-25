import React, { Component } from "react";
import "./Feu.css";

export class Signalisation extends Component {
  render() {
    return (
      <div>
        <div className="top-left-traffic-light">
          <div className="red-light"></div>
          <div className="yellow-light"></div>
          <div className="green-light"></div>
        </div>
        <div className="top-right-traffic-light">
          <div className="red-light"></div>
          <div className="yellow-light"></div>
          <div className="green-light"></div>
        </div>
        <div className="bottom-right-traffic-light">
          <div className="red-light"></div>
          <div className="yellow-light"></div>
          <div className="green-light"></div>
        </div>
        <div className="bottom-left-traffic-light">
          <div className="red-light"></div>
          <div className="yellow-light"></div>
          <div className="green-light"></div>
        </div>
      </div>
    );
  }
}
