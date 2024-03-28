import React from "react";
import { useEffect } from "react";
import "../header/header.css";
import HeaderImage from "../../assets/img-profil.webp";
import data from "./data.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <header id="header">
      <div className="container header__container">
        <div className="header__profile" data-aos="fade-in">
          <img src={HeaderImage} alt="Profil" />
        </div>
        <h3 data-aos="fade-up">Romain Girard</h3>
        <p data-aos="fade-up">
          Vous êtes à un clic de créer le site Web ou l’application Web de vos
          rêves. Envoyez-moi dès aujourd'hui les détails de votre projet de site
          Web moderne, adapté aux mobiles et hautement performant.
        </p>
        <div className="header__cta" data-aos="fade-up">
          <a href="#contact" className="btn primary">
            Contact
          </a>
          <a href="#portfolio" className="btn light">
            Mes travaux
          </a>
        </div>
        <div className="header__socials">
          {data.map((item, key) => (
            <a
              key={key}
              href={item.link}
              target="_blank"
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
