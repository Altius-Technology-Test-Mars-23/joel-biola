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
            Nombre de collision voitures verticaux :
            <span className="main-fuzzy"></span>
          </div>
          <div>
            Nombre des voitures horizontaux :
            <span className="secondary-crisp"></span>
          </div>
          <div>
            Nombre de collission voitures horizontaux:
            <span className="secondary-fuzzy"></span>
          </div>
          <div>
            Nombre total : <span className="fog-crisp"></span>
          </div>
          <div>
            Infraction priorité droite : <span className="fog-fuzzy"></span>
          </div>
          <div>
            Durée du feu verte : <span className="output-crisp"></span>
          </div>
          <div>
            Infraction au feu rouge : <span className="output-fuzzy"></span>
          </div>
          <div>
            Feu vert pour : <span className="green-light-for"></span>
          </div>

          <div>
            Nombre des vehicule ayant quitté la zone :{" "}
            <span className="cars-not-in-view"></span>
          </div>

          <div>
            Temps de Simulation : <span className="time-simulation"></span>
          </div>
        </div>
      </div>
    );
  }
}
