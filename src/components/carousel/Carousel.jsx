import React from "react";
import "./carousel.css";
import logoGit from "../../assets/git.webp";
import logoReact from "../../assets/react-logo.svg";
import logoRedux from "../../assets/redux-logo.svg";
import logoSass from "../../assets/sass.webp";
import logoHTML from "../../assets/html-logo.svg";
import logoCSS from "../../assets/css-logo.svg";
import logoJS from "../../assets/javascript-logo.svg";
import logoFigma from "../../assets/figma.webp";
import logoPHP from "../../assets/php.webp";
import logoMySQL from "../../assets/mysql.webp";
import logoAstro from "../../assets/astro-logo.svg";
import logoTailwind from "../../assets/tailwind-logo.svg";
import logoHTMX from "../../assets/htmx.png";
import logoAlpine from "../../assets/alpinejs.png";
const logos = [
  `${logoGit}`,
  `${logoReact}`,
  `${logoRedux}`,
  `${logoSass}`,
  `${logoTailwind}`,
  `${logoHTML}`,
  `${logoCSS}`,
  `${logoJS}`,
  `${logoAstro}`,
  `${logoHTMX}`,
  `${logoAlpine}`,
  `${logoFigma}`,
  `${logoPHP}`,
  `${logoMySQL}`,
];

const Carousel = () => {
  return (
    <div className="carousel">
      {logos.map((logo, index) => (
        <div
          key={index}
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
