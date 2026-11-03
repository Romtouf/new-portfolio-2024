import React from "react";
import Modal from "../components/modal/Modal";
import { Ornament } from "../components/book/pages";
import { useThemeContext } from "../context/theme-context";
import { primaryColors, backgroundColors } from "./data";
import PrimaryColor from "./PrimaryColor";
import BackgroundColor from "./BackgroundColor";
import "./theme.css";

const Theme = () => {
  const { themeState } = useThemeContext();
  // The dialog lives outside <main>, so it gets the current hue here
  const current =
    primaryColors.find((color) => color.className === themeState.primary) || primaryColors[0];

  return (
    <Modal className="theme__modal" title="Personnaliser le thème" style={{ "--primary-hue": current.hue }}>
      <span className="theme__eyebrow">Nuancier</span>
      <h3 className="theme__title">Personnaliser le thème</h3>
      <Ornament className="theme__ornament" />
      <p className="theme__intro">
        Choisissez la teinte de l'encre, du cuir et des cachets, puis le fond des pages.
      </p>

      <div className="theme__group">
        <h4 className="theme__label">Teinte</h4>
        <div className="theme__primary-colors">
          {primaryColors.map((color) => (
            <PrimaryColor key={color.className} {...color} />
          ))}
        </div>
      </div>

      <div className="theme__group">
        <h4 className="theme__label">Fond</h4>
        <div className="theme__background-colors">
          {backgroundColors.map((background) => (
            <BackgroundColor key={background.className} {...background} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Theme;
