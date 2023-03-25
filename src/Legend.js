import React, { Component } from "react";
import "./Legend.css";

export class Legend extends Component {
  render() {
    return (
      <div>
        <div className="main-legend">
          <div>
            Nombre des voiture verticaux :<span className="main-crips"></span>
          </div>
          <div>
            Proportion des voitures verticaux :
            <span className="main-fuzzy"></span>
          </div>
          <div>
            Nombre des voitures horizontaux :
            <span className="secondary-crisp"></span>
          </div>
          <div>
            Proportion des voitures horizontaux:
            <span className="secondary-fuzzy"></span>
          </div>
          <div>
            Nombre total : <span className="fog-crisp"></span>
          </div>
          <div>
            Proportion totale : <span className="fog-fuzzy"></span>
          </div>
          <div>
            Durée du feu verte : <span className="output-crisp"></span>
          </div>
          <div>
            Durée du feu vert (proportion) :{" "}
            <span className="output-fuzzy"></span>
          </div>
          <div>
            Feu vert pour : <span className="green-light-for"></span>
          </div>
        </div>
      </div>
    );
  }
}
