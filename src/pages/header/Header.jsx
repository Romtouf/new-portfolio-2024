import React from "react";
import { useEffect } from "react";
import { FiBookOpen, FiFeather } from "react-icons/fi";
import "../../components/paper/paper.css";
import "../header/header.css";
import HeaderImage from "../../assets/img-profil.webp";
import data from "./data.js";
import AOS from "aos";
import "aos/dist/aos.css";
import { Ornament, toRoman } from "../../components/book/pages";

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <header id="header">
      <div className="container header__container">
        <div className="title-stack">
          <span className="title-stack__sheet title-stack__sheet--back" aria-hidden="true" />
          <span className="title-stack__sheet title-stack__sheet--middle" aria-hidden="true" />

          <div className="title-page">
            <span className="title-page__frame title-page__frame--outer" aria-hidden="true" />
            <span className="title-page__frame title-page__frame--inner" aria-hidden="true" />
            <span className="title-page__corners" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>

            {/* "ink" elements fade in one after the other (--d = delay) */}
            <span className="title-page__eyebrow ink" style={{ "--d": "0.3s" }}>
              Portfolio
            </span>

            <div className="title-page__portrait ink" style={{ "--d": "0.45s" }}>
              <img src={HeaderImage} alt="Portrait de Romain Girard" />
            </div>

            {/* Written like a signature (see header.css) */}
            <h1 className="title-page__name">Romain Girard</h1>

            <p className="title-page__role ink" style={{ "--d": "1.6s" }}>
              Développeur web &amp; formateur
            </p>
            <span className="title-page__ornament-wrap ink" style={{ "--d": "1.7s" }}>
              <Ornament className="title-page__ornament" />
            </span>
            <p className="title-page__intro ink" style={{ "--d": "1.8s" }}>
              Développeur web passionné et formateur expérimenté, je transforme vos idées en
              solutions digitales innovantes. Spécialisé dans les technologies modernes, je vous
              accompagne dans la création de sites web performants et vous forme aux meilleures
              pratiques du développement web.
            </p>

            <div className="title-page__cta ink" style={{ "--d": "1.95s" }}>
              <a href="#portfolio" className="title-page__btn">
                <FiBookOpen aria-hidden="true" /> Lire le carnet
              </a>
              <a href="#contact" className="title-page__btn title-page__btn--ghost">
                <FiFeather aria-hidden="true" /> M'écrire
              </a>
            </div>

            <span className="title-page__imprint ink" style={{ "--d": "2.1s" }}>
              — {toRoman(new Date().getFullYear())} —
            </span>
          </div>
        </div>

        <div className="header__socials">
          {data.map((item, key) => (
            <a
              key={key}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
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
