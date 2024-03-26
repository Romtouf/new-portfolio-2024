import React from "react";
import Modal from "../components/modal/Modal";
import { primaryColors, backgroundColors } from "./data";
import PrimaryColor from "./PrimaryColor";
import BackgroundColor from "./BackgroundColor";
import "./theme.css";

const Theme = () => {
  return (
    <Modal className="theme__modal">
      <h3>Customisez votre thème</h3>
      <small>
        Modifiez la couleur principale et la couleur d'arrière-plan selon vos
        préférences
      </small>
      <div className="theme__primary-wrapper">
        <h5>Couleur principale</h5>
        <div className="theme__primary-colors">
          {primaryColors.map((pColor) => (
            <PrimaryColor key={pColor.className} className={pColor.className} />
          ))}
        </div>
      </div>
      <div className="theme__background-wrapper">
        <h5>Couleur de fond</h5>
        <div className="theme__background-colors">
          {backgroundColors.map((bColor) => (
            <BackgroundColor
              key={bColor.className}
              className={bColor.className}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Theme;
