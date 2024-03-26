import React from "react";
import "./carousel.css";
import logoGit from "../../assets/git.svg";
import logoReact from "../../assets/react-logo.svg";
import logoRedux from "../../assets/redux-logo.svg";
import logoSass from "../../assets/sass.webp";
import logoHTML from "../../assets/html-logo.svg";
import logoCSS from "../../assets/css-logo.svg";
import logoJS from "../../assets/javascript-logo.svg";
import logoFigma from "../../assets/figma.svg";

const logos = [
  `${logoGit}`,
  `${logoReact}`,
  `${logoRedux}`,
  `${logoSass}`,
  `${logoHTML}`,
  `${logoCSS}`,
  `${logoJS}`,
  `${logoFigma}`,
];

const Carousel = () => {
  return (
    <div className="carousel">
      {logos.map((logo, index) => (
        <div
          className="carousel__face"
          style={{ "--rotate": `${index * (360 / logos.length)}deg` }}
        >
          <img src={logo} alt="logo" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
