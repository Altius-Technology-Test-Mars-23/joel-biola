import React, { Component } from "react";

export class Car extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fonction d'appartenance triangulaire qui détermine le degré d'appartenance à un ensemble
    function getMembershipRatio(x, a, b, c) {
      if (x <= a || x >= c) {
        return 0;
      }

      if (a <= x && x <= b) {
        return (x - a) / (b - a);
      }

      if (b <= x && x <= c) {
        return (c - x) / (c - b);
      }
    }

    // Il détermine l'ensemble dont une valeur crips du nombre de voitures fait partie
    function flouNumOfCars(numOfCars) {
      let lowRatio = getMembershipRatio(numOfCars, 0, 4, 8);
      let mediumRatio = getMembershipRatio(numOfCars, 6, 10, 14);
      let highRatio = getMembershipRatio(numOfCars, 12, 16, 20);

      let max = Math.max(lowRatio, mediumRatio, highRatio);

      if (max === lowRatio) {
        return "l";
      } else if (max === mediumRatio) {
        return "m";
      } else {
        return "h";
      }
    }

    // Détermine l'ensemble auquel appartient une valeur nette
    function flouterNiv(fogLevel) {
      let lowRatio = getMembershipRatio(fogLevel, 0, 100, 200);
      let mediumRatio = getMembershipRatio(fogLevel, 170, 270, 370);
      let highRatio = getMembershipRatio(fogLevel, 350, 450, 600);

      let max = Math.max(lowRatio, mediumRatio, highRatio);

      if (max === lowRatio) {
        return "l";
      } else if (max === mediumRatio) {
        return "m";
      } else {
        return "h";
      }
    }

    // Fonction qui calcule la sortie (durée de la couleur verte du feu tricolore)
    function calculFlouOutput(
      flouVoitureArrivant,
      flouVoitureAttendant,
      flouNiveau
    ) {
      // Structure du jeu de règles :
      // voitures venant vers le feu vert,
      // voitures floues attendant le feu rouge,
      // brouillard flou,
      // durée  du feu (vert)
      let rulesSet = [
        ["h", "l", "l", "classer"],
        ["h", "l", "m", "moyenne"],
        ["h", "l", "h", "grand"],
        ["h", "m", "l", "moyenne"],
        ["h", "m", "m", "moyenne"],
        ["h", "m", "h", "grand"],
        ["h", "h", "l", "grand"],
        ["h", "h", "m", "grand"],
        ["h", "h", "h", "grand"],
        ["m", "l", "l", "classer"],
        ["m", "l", "m", "moyenne"],
        ["m", "l", "h", "moyenne"],
        ["m", "m", "l", "moyenne"],
        ["m", "m", "m", "moyenne"],
        ["m", "m", "h", "moyenne"],
        ["m", "h", "l", "grand"],
        ["m", "h", "m", "grand"],
        ["m", "h", "h", "moyenne"],
        ["l", "l", "l", "classer"],
        ["l", "l", "m", "moyenne"],
        ["l", "l", "h", "moyenne"],
        ["l", "m", "l", "moyenne"],
        ["l", "m", "m", "grand"],
        ["l", "m", "h", "moyenne"],
        ["l", "h", "l", "classer"],
        ["l", "h", "m", "moyenne"],
        ["l", "h", "h", "grand"],
      ];

      // Il renvoie la sortie selon les règles et les paramètres de la fonction
      for (let i = 0; i < rulesSet.length; i++) {
        if (
          rulesSet[i][0] === flouVoitureArrivant &&
          rulesSet[i][1] === flouVoitureAttendant &&
          rulesSet[i][2] === flouNiveau
        ) {
          return rulesSet[i][3];
        }
      }
    }

    // Fonction qui transforme la valeur de la sortie en une valeur nette
    function deflouterOutput(DureFeuxCirculation) {
      if (DureFeuxCirculation === "classer") {
        return 3;
      } else if (DureFeuxCirculation === "moyenne") {
        return 6;
      } else {
        return 10;
      }
    }

    // il traite notamment de la simulation de la circulation des voitures sur les 2 rues
    // Il met également à jour le DOM (page) pour afficher les informations liées aux feux de circulation
    // combien de voitures roulent, niveau de brouillard, leurs valeurs floues et nettes

    // Déclaration des constantes initiales et des structures de données initiales
    // nécessaire de suivre les éléments du simulateur
    // Nœuds du DOM pour les feux de circulation
    const topLeftTrafficLightNode = document.querySelector(
      ".top-left-traffic-light"
    );
    const topRightTrafficLightNode = document.querySelector(
      ".top-right-traffic-light"
    );
    const bottomRightTrafficLightNode = document.querySelector(
      ".bottom-right-traffic-light"
    );
    const bottomLeftTrafficLightNode = document.querySelector(
      ".bottom-left-traffic-light"
    );

    // Nœuds DOM pour les informations affichées sur la page (données)
    const noeudPrincipaleCrisp = document.querySelector(".main-crips");
    const noeudPrincipaleFlou = document.querySelector(".main-fuzzy");
    const noeudSecondaireCrisp = document.querySelector(".secondary-crisp");
    const noeudSecondaireFlou = document.querySelector(".secondary-fuzzy");
    const nouedBrouiCrisp = document.querySelector(".fog-crisp");
    const nouedBrouiFlou = document.querySelector(".fog-fuzzy");
    const nouedSortiCrisp = document.querySelector(".output-crisp");
    const noeudSortiFlou = document.querySelector(".output-fuzzy");
    const feuVertNoeud = document.querySelector(".green-light-for");

    // La position où les voitures doivent s'arrêter à chaque feu
    const voituresFeuStopPositions = {
      down:
        parseInt(topLeftTrafficLightNode.style.marginTop) +
        parseInt(topLeftTrafficLightNode.style.height),
      left:
        parseInt(topRightTrafficLightNode.style.marginLeft) +
        parseInt(topRightTrafficLightNode.style.width),
      right:
        parseInt(bottomLeftTrafficLightNode.style.marginLeft) +
        parseInt(bottomLeftTrafficLightNode.style.width),
      up:
        parseInt(bottomRightTrafficLightNode.style.marginTop) +
        parseInt(bottomRightTrafficLightNode.style.height),
    };

    // La position où les voitures doivent être insérées dans la page/fenêtre
    const positionsApparitionVoitures = {
      top: {
        top: "0px",
        left: "307px",
      },
      left: {
        top: "337px",
        left: "0px",
      },
      right: {
        top: "305px",
        left: "640px",
      },
      bottom: {
        top: "650px",
        left: "341px",
      },
    };

    // Les indications routières des voitures
    const mouvementDirections = {
      left: "left",
      down: "down",
      up: "up",
      right: "right",
    };

    // La structure de données pour la gestion des voitures créées
    let carNodes = {};

    // Une table de hachage qui montre les positions des voitures sur la page
    // position des pixels -> id de la voiture
    // Séparé en 4 positions (où les voitures apparaissent initialement sur la page)
    let carPositions = {
      top: {},
      down: {},
      left: {},
      right: {},
    };

    // État de la couleur des feux de signalisation. Les données de cette table de hachage seront modifiées en fonction des données de sortie
    let greenLight = {
      top: true,
      down: true,
      left: false,
      right: false,
    };

    // La position des feux de circulation
    let trafficLightPositions = {
      top: 300,
      down: 370,
      left: 300,
      right: 370,
    };

    // Déclarer l'objet qui stocke le nombre de voitures sur la page en attente
    // chaque zone (en gros, nous avons 4 zones / 4 lignes qui se croisent)
    // La liaison de données est effectuée sur les variables haut, bas, gauche, droite
    //et les informations dans le DOM sont automatiquement mises à jour
    let carsWaiting = {
      top1: 0,
      down1: 0,
      left1: 0,
      right1: 0,
      fuzzyNum: function (abbreviation) {
        if (abbreviation === "l") {
          return "peu";
        } else if (abbreviation === "m") {
          return "moyenne";
        } else {
          return "beaucoup";
        }
      },
    };

    Object.defineProperty(carsWaiting, "top", {
      get: function () {
        return this.top1;
      },
      set: function (v) {
        this.top1 = v;
        let fuzzy = flouNumOfCars(this.top1 + this.down1);
        noeudPrincipaleCrisp.innerHTML = this.top1 + this.down1;
        noeudPrincipaleFlou.innerHTML = this.fuzzyNum(fuzzy);
      },
    });

    Object.defineProperty(carsWaiting, "down", {
      get: function () {
        return this.down1;
      },
      set: function (v) {
        this.down1 = v;
        let fuzzy = flouNumOfCars(this.top1 + this.down1);
        noeudPrincipaleCrisp.innerHTML = this.top1 + this.down1;
        noeudPrincipaleFlou.innerHTML = this.fuzzyNum(fuzzy);
      },
    });

    Object.defineProperty(carsWaiting, "left", {
      get: function () {
        return this.left1;
      },
      set: function (v) {
        this.left1 = v;
        let fuzzy = flouNumOfCars(this.left1 + this.right1);
        noeudSecondaireCrisp.innerHTML = this.left1 + this.right1;
        noeudSecondaireFlou.innerHTML = this.fuzzyNum(fuzzy);
      },
    });

    Object.defineProperty(carsWaiting, "right", {
      get: function () {
        return this.right1;
      },
      set: function (v) {
        this.right1 = v;
        let fuzzy = flouNumOfCars(this.left1 + this.right1);
        noeudSecondaireCrisp.innerHTML = this.left1 + this.right1;
        noeudSecondaireFlou.innerHTML = this.fuzzyNum(fuzzy);
      },
    });

    // Changer la couleur des feux tricolores (sur la page) en fonction de la valeur verte des 2 feux tricolores
    // de la rue principale, c'est-à-dire celui de la verticale
    function changeTrafficLightColor(mainLaneIsGreen) {
      let topLeftLightNode = document.querySelector(".top-left-traffic-light");
      let topLeftRedNode = topLeftLightNode.querySelector(".red-light");
      let topLeftGreenNode = topLeftLightNode.querySelector(".green-light");

      let bottomRightLightNode = document.querySelector(
        ".bottom-right-traffic-light"
      );
      let bottomRightRedNode = bottomRightLightNode.querySelector(".red-light");
      let bottomRightGreenNode =
        bottomRightLightNode.querySelector(".green-light");

      let topRightLightNode = document.querySelector(
        ".top-right-traffic-light"
      );
      let topRightRedNode = topRightLightNode.querySelector(".red-light");
      let topRightGreenNode = topRightLightNode.querySelector(".green-light");

      let bottomLeftLightNode = document.querySelector(
        ".bottom-left-traffic-light"
      );
      let bottomLeftRedNode = bottomLeftLightNode.querySelector(".red-light");
      let bottomLeftGreenNode =
        bottomLeftLightNode.querySelector(".green-light");

      greenLight.top = mainLaneIsGreen;
      greenLight.down = mainLaneIsGreen;
      greenLight.left = !mainLaneIsGreen;
      greenLight.right = !mainLaneIsGreen;

      if (mainLaneIsGreen) {
        topLeftGreenNode.classList.add("on");
        bottomRightGreenNode.classList.add("on");
        topLeftRedNode.classList.remove("on");
        bottomRightRedNode.classList.remove("on");

        topRightGreenNode.classList.remove("on");
        bottomLeftGreenNode.classList.remove("on");
        topRightRedNode.classList.add("on");
        bottomLeftRedNode.classList.add("on");
      } else {
        topLeftGreenNode.classList.remove("on");
        bottomRightGreenNode.classList.remove("on");
        topLeftRedNode.classList.add("on");
        bottomRightRedNode.classList.add("on");

        topRightGreenNode.classList.add("on");
        bottomLeftGreenNode.classList.add("on");
        topRightRedNode.classList.remove("on");
        bottomLeftRedNode.classList.remove("on");
      }
    }

    // Vérifiez si la voiture a laissé la partie visible de la fenêtre
    // Nécessaire pour libérer les ressources occupées par les machines (mémoire/cpu)
    function isInViewport(elem) {
      let bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Générer un entier aléatoire entre min et max
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    // Générer des paramètres aléatoires pour une voiture (esthétique)
    function buildRandomCarSpecs() {
      const width = "20px";
      const height = getRandomInt(20, 30) + "px";
      const borderRadius = getRandomInt(10, 40) + "%";
      const colors = ["#133457", "#CC2B1F", "#000000", "#67389A"];
      const carColor = colors[getRandomInt(0, 3)];

      return { width, height, borderRadius, carColor };
    }

    // Construire un nœud dans le DOM pour une voiture en utilisant des paramètres aléatoires
    function buildRandomCarNode() {
      let carNode = document.createElement("div");
      let carSpecs = buildRandomCarSpecs();

      carNode.classList.add("car");

      carNode.style.width = carSpecs.width;
      carNode.style.height = carSpecs.height;
      carNode.style.borderRadius = carSpecs.borderRadius;
      carNode.style.backgroundColor = carSpecs.carColor;
      carNode.style.backgroundColor = carSpecs.carColor;

      carNode.metaData = {};

      return carNode;
    }

    // Vérifiez si les voitures venant d'en haut doivent s'arrêter ou non
    //Ils doivent s'arrêter s'ils voient un feu rouge ou s'il y a une voiture devant eux qui est arrêtée
    function carTopHasToStop(carNode) {
      const carMarginTop = parseInt(carNode.style.marginTop);
      const carHeight = parseInt(carNode.style.height);
      const lookAheadStart = carMarginTop + carHeight;

      if (
        carPositions.top[lookAheadStart + 2] ||
        carPositions.top[lookAheadStart + 3] ||
        carPositions.top[lookAheadStart + 4]
      ) {
        return true;
      }

      if (
        !greenLight.top &&
        (lookAheadStart === trafficLightPositions.top ||
          lookAheadStart === trafficLightPositions.top + 1 ||
          lookAheadStart === trafficLightPositions.top + 2)
      ) {
        return true;
      }

      return false;
    }

    // Vérifier si les voitures venant d'en bas doivent s'arrêter ou non
    // Ils doivent s'arrêter s'ils voient un feu rouge ou s'il y a une voiture devant eux qui est arrêtée
    function carDownHasToStop(carNode) {
      const lookAheadStart = parseInt(carNode.style.marginTop);

      if (
        carPositions.down[lookAheadStart - 2] ||
        carPositions.down[lookAheadStart - 3] ||
        carPositions.down[lookAheadStart - 4]
      ) {
        return true;
      }

      if (
        !greenLight.down &&
        (lookAheadStart === trafficLightPositions.down ||
          lookAheadStart === trafficLightPositions.down - 1 ||
          lookAheadStart === trafficLightPositions.down - 2)
      ) {
        return true;
      }

      return false;
    }

    // Vérifier si les voitures venant de la droite doivent s'arrêter ou non
    // Ils doivent s'arrêter s'ils voient un feu rouge ou s'il y a une voiture devant eux qui est arrêtée
    function carRightHasToStop(carNode) {
      const lookAheadStart = parseInt(carNode.style.marginLeft);

      if (
        carPositions.right[lookAheadStart - 2] ||
        carPositions.right[lookAheadStart - 3] ||
        carPositions.right[lookAheadStart - 4]
      ) {
        return true;
      }

      if (
        !greenLight.right &&
        (lookAheadStart === trafficLightPositions.right ||
          lookAheadStart === trafficLightPositions.right - 1 ||
          lookAheadStart === trafficLightPositions.right - 2)
      ) {
        return true;
      }

      return false;
    }

    // Vérifie si les voitures venant de la gauche doivent s'arrêter ou non
    // Ils doivent s'arrêter s'ils voient un feu rouge ou s'il y a une voiture devant eux qui est arrêtée
    function carLeftHasToStop(carNode) {
      const lookAheadStart =
        parseInt(carNode.style.marginLeft) + parseInt(carNode.style.height);

      if (
        carPositions.left[lookAheadStart + 2] ||
        carPositions.left[lookAheadStart + 3] ||
        carPositions.left[lookAheadStart + 4]
      ) {
        return true;
      }

      if (
        !greenLight.left &&
        (lookAheadStart === trafficLightPositions.left ||
          lookAheadStart === trafficLightPositions.left + 1 ||
          lookAheadStart === trafficLightPositions.left + 2)
      ) {
        return true;
      }

      return false;
    }

    // Vérifier si une voiture doit s'arrêter ou non (le sens de la marche est pris en compte)
    function carHasToStop(carNode) {
      let carHasToStop = false;

      if (carNode.metaData.movementDirection === mouvementDirections.down) {
        carHasToStop = carTopHasToStop(carNode);
      } else if (
        carNode.metaData.movementDirection === mouvementDirections.up
      ) {
        carHasToStop = carDownHasToStop(carNode);
      } else if (
        carNode.metaData.movementDirection === mouvementDirections.left
      ) {
        carHasToStop = carRightHasToStop(carNode);
      } else if (
        carNode.metaData.movementDirection === mouvementDirections.right
      ) {
        carHasToStop = carLeftHasToStop(carNode);
      }

      return carHasToStop;
    }

    /**
     * Créer un nœud de voiture prêt à être inséré dans la page
     *
     * @returns {null|HTMLDivElement} Renvoie null si le nombre maximum de voitures sur une section ou un nœud de voiture a été atteint
     *
     */
    function spawnRandomCar() {
      const availableDirections = [
        mouvementDirections.down,
        mouvementDirections.up,
        mouvementDirections.left,
        mouvementDirections.right,
      ];
      const movementDirection = availableDirections[getRandomInt(0, 4)];

      // Si la limite de 10 voitures par section (haut/bas/gauche/droite) a été dépassée, retourne null
      // Sinon, les voitures se chevaucheraient
      if (
        (movementDirection === mouvementDirections.down &&
          carsWaiting.top > 5) ||
        (movementDirection === mouvementDirections.up &&
          carsWaiting.down > 5) ||
        (movementDirection === mouvementDirections.left &&
          carsWaiting.right > 5) ||
        (movementDirection === mouvementDirections.right &&
          carsWaiting.left > 5)
      ) {
        return null;
      }

      const carId = Math.random();

      // Définir les métadonnées sur chaque objet voitures globalement requis pour la logique
      let carNode = buildRandomCarNode();
      carNode.metaData.movementDirection = movementDirection;
      carNode.metaData.id = carId;
      carNode.metaData.isWaiting = true;
      carNodes[carId] = carNode;

      // Ajuste l'affichage des voitures et incrémente le nombre de voitures en attente
      // Théoriquement, ils attendent dans l'état initial jusqu'à ce qu'ils atteignent le feu tricolore
      if (movementDirection === mouvementDirections.left) {
        carNode.classList.add("car-horizontal");
        carNode.style.marginTop = positionsApparitionVoitures.right.top;
        carNode.style.marginLeft = positionsApparitionVoitures.right.left;
        carsWaiting.right++;
      } else if (movementDirection === mouvementDirections.right) {
        carNode.classList.add("car-horizontal");
        carNode.style.marginTop = positionsApparitionVoitures.left.top;
        carNode.style.marginLeft = positionsApparitionVoitures.left.left;
        carsWaiting.left++;
      } else if (movementDirection === mouvementDirections.down) {
        carNode.style.marginTop = positionsApparitionVoitures.top.top;
        carNode.style.marginLeft = positionsApparitionVoitures.top.left;
        carsWaiting.top++;
      } else {
        carNode.style.marginTop = positionsApparitionVoitures.bottom.top;
        carNode.style.marginLeft = positionsApparitionVoitures.bottom.left;
        carsWaiting.down++;
      }

      // Fonction récursive pour déplacer une voiture
      const moveCar = () => {
        // Arrête l'exécution de la fonction si la voiture est en attente
        if (carHasToStop(carNode)) {
          setTimeout(moveCar, 10);
          return;
        }

        // Gère l'état de la voiture par rapport au simulateur en fonction du sens de marche
        // Pour chaque direction de marche, la logique sera répétée comme dans "if"
        if (movementDirection === mouvementDirections.down) {
          // Supprime la position de cette voiture car elle avancera de 2 pixels
          delete carPositions.top[parseInt(carNode.style.marginTop)];
          carNode.style.marginTop =
            parseInt(carNode.style.marginTop) + 2 + "px";
          // Ajoute la nouvelle position de la voiture à la table de hachage
          carPositions.top[parseInt(carNode.style.marginTop)] =
            carNode.metaData.id;

          // Si elle a dépassé le feu tricolore, la voiture n'attend plus, supprimer du référentiel
          // des voitures en attente
          if (
            parseInt(carNode.style.marginTop) >
              trafficLightPositions.top + 40 &&
            carNode.metaData.isWaiting
          ) {
            carsWaiting.top--;
            carNode.metaData.isWaiting = false;
          }

          // Si la voiture a quitté la fenêtre, supprimer de la table de hachage des positions de la voiture
          if (!isInViewport(carNode)) {
            delete carPositions.top[parseInt(carNode.style.marginTop)];
          }
        } else if (movementDirection === mouvementDirections.up) {
          delete carPositions.down[
            parseInt(carNode.style.marginTop) + parseInt(carNode.style.height)
          ];
          carNode.style.marginTop =
            parseInt(carNode.style.marginTop) - 2 + "px";
          carPositions.down[
            parseInt(carNode.style.marginTop) + parseInt(carNode.style.height)
          ] = carNode.metaData.id;

          if (
            parseInt(carNode.style.marginTop) <
              trafficLightPositions.down - 40 &&
            carNode.metaData.isWaiting
          ) {
            carsWaiting.down--;
            carNode.metaData.isWaiting = false;
          }

          if (!isInViewport(carNode)) {
            delete carPositions.down[
              parseInt(carNode.style.marginTop) + parseInt(carNode.style.height)
            ];
          }
        } else if (movementDirection === mouvementDirections.left) {
          delete carPositions.right[
            parseInt(carNode.style.marginLeft) + parseInt(carNode.style.height)
          ];
          carNode.style.marginLeft =
            parseInt(carNode.style.marginLeft) - 2 + "px";
          carPositions.right[
            parseInt(carNode.style.marginLeft) + parseInt(carNode.style.height)
          ] = carNode.metaData.id;

          if (
            parseInt(carNode.style.marginLeft) <
              trafficLightPositions.right - 40 &&
            carNode.metaData.isWaiting
          ) {
            carsWaiting.right--;
            carNode.metaData.isWaiting = false;
          }

          if (!isInViewport(carNode)) {
            delete carPositions.right[
              parseInt(carNode.style.marginLeft) +
                parseInt(carNode.style.height)
            ];
          }
        } else if (movementDirection === mouvementDirections.right) {
          delete carPositions.left[parseInt(carNode.style.marginLeft)];
          carNode.style.marginLeft =
            parseInt(carNode.style.marginLeft) + 2 + "px";
          carPositions.left[parseInt(carNode.style.marginLeft)] =
            carNode.metaData.id;

          if (
            parseInt(carNode.style.marginLeft) >
              trafficLightPositions.left + 40 &&
            carNode.metaData.isWaiting
          ) {
            carsWaiting.left--;
            carNode.metaData.isWaiting = false;
          }

          if (!isInViewport(carNode)) {
            delete carPositions.left[parseInt(carNode.style.marginLeft)];
          }
        }

        // Si la voiture n'est plus dans la fenêtre, libère les ressources (memory/cpu cleanup)
        if (!isInViewport(carNode)) {
          carNode.remove();
          delete carNodes[carNode.metaData.id];
          return;
        }

        // Récursivité qui permet aux voitures de fonctionner en permanence
        setTimeout(moveCar, 10);
      };

      // Initialise le mouvement de la voiture
      moveCar();

      return carNode;
    }

    // Fonction qui ajoute une voiture aléatoire à la page
    function appendRandomCarToDom(delay) {
      setTimeout(() => {
        appendRandomCarToDom(getRandomInt(200, 700));

        let carNode = spawnRandomCar();

        if (carNode === null) {
          return;
        }

        document.body.append(carNode);
      }, delay);
    }

    // Ajoute une voiture au hasard à la page
    appendRandomCarToDom(getRandomInt(200, 700));

    let mainLaneGreen = true;
    let fogLevel = getRandomInt(0, 600);
    let flouNiveau = flouterNiv(fogLevel);

    // Fonction qui transforme la valeur en une valeur plus conviviale
    function fuzzyFog(abbreviation) {
      if (abbreviation === "l") {
        return "réduit";
      } else if (abbreviation === "m") {
        return "moyenne";
      } else {
        return "ramassé";
      }
    }

    nouedBrouiCrisp.innerHTML = fogLevel;
    nouedBrouiFlou.innerHTML = fuzzyFog(flouNiveau);

    // Fonction qui alterne la couleur des feux tricolores en fonction d'un retard
    // Cela se fait par appel de fonction recursive (récursion)
    // Ce délai est essentiellement donné par la sortie du système, selon les règles fixées selon
    // les variables d'entrée et de sortie
    function alternateTrafficLights(delay) {
      setTimeout(() => {
        // nombre de voitures sur la rue verticale
        let fuzzyMainLane = flouNumOfCars(carsWaiting.top + carsWaiting.down);
        // nombre de voitures sur la rue horizontale
        let fuzzySecondaryLane = flouNumOfCars(
          carsWaiting.left + carsWaiting.right
        );
        // niveau de flou
        let flouNiveau = flouterNiv(fogLevel);

        // Calcul du temps pour les feux de circulation, en tant que valeurs
        let fuzzyGreenLightDuration = null;
        if (mainLaneGreen) {
          fuzzyGreenLightDuration = calculFlouOutput(
            fuzzyMainLane,
            fuzzySecondaryLane,
            flouNiveau
          );
        } else {
          fuzzyGreenLightDuration = calculFlouOutput(
            fuzzySecondaryLane,
            fuzzyMainLane,
            flouNiveau
          );
        }

        //  le temps de feux tricolores
        let crispDuration = deflouterOutput(fuzzyGreenLightDuration);
        nouedSortiCrisp.innerHTML = crispDuration + "secondes";
        noeudSortiFlou.innerHTML = fuzzyGreenLightDuration;
        mainLaneGreen = !mainLaneGreen;
        feuVertNoeud.innerHTML = mainLaneGreen
          ? "rue verticale"
          : "rue horizontale";

        // Changer les couleurs des feux tricolores et relancer les calculs lorsque le temps des feux verts est expiré
        changeTrafficLightColor(mainLaneGreen);
        alternateTrafficLights(crispDuration * 1000);
      }, delay);
    }

    // Démarrer les feux de circulation
    alternateTrafficLights(500);
  }
  componentDidUpdate() {
    console.log(this.state.feuVertNoeud);
  }

  render() {
    return <div></div>;
  }
}
