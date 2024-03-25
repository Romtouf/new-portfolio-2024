import React from "react";
import "../header/header.css";
import HeaderImage from "../../assets/img-profil.webp";
import data from "./data.js";

const Header = () => {
  return (
    <header id="header">
      <div className="container header__container">
        <div className="header__profile">
          <img src={HeaderImage} alt="Profil" />
        </div>
        <h3>Romain Girard</h3>
        <p>
          Vous êtes à un clic de créer le site Web ou l’application Web de vos
          rêves. Envoyez-moi dès aujourd'hui les détails de votre projet de site
          Web moderne, adapté aux mobiles et hautement performant.
        </p>
        <div className="header__cta">
          <a href="#contact" className="btn primary">
            Let's talk
          </a>
          <a href="#portfolio" className="btn light">
            My work
          </a>
        </div>
        <div className="header__socials">
          {data.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
