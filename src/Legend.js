import React, { Component } from "react";
import "./Legend.css";

export class Legend extends Component {
  render() {
    return (
      <div>
        <div className="main-legend">
          <div>
            Croustillant non. tramways verticaux : :
            <span className="main-crips"></span>
          </div>
          <div>
            Non flou. tramways verticaux : <span className="main-fuzzy"></span>
          </div>
          <div>
            Croustillant non. tramways horizontaux :
            <span className="secondary-crisp"></span>
          </div>
          <div>
            Non flou. tramways horizontaux:
            <span className="secondary-fuzzy"></span>
          </div>
          <div>
            Brouillard croustillant : <span className="fog-crisp"></span>
          </div>
          <div>
            Brouillard flou : <span className="fog-fuzzy"></span>
          </div>
          <div>
            Durée de la lumière verte nette :{" "}
            <span className="output-crisp"></span>
          </div>
          <div>
            Durée floue du feu vert : <span className="output-fuzzy"></span>
          </div>
          <div>
            Feu vert pour : <span className="green-light-for"></span>
          </div>
        </div>
      </div>
    );
  }
}
