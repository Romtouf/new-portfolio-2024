import React from "react";
import { FiArrowUp } from "react-icons/fi";
import { socials } from "./data";
import { Ornament, toRoman } from "../../components/book/pages";
import "../../components/paper/paper.css";
import "../footer/footer.css";

// The printer's note found on the last page of a book
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="colophon">
      <div className="container colophon__container">
        <div className="colophon__label">
          <span className="colophon__eyebrow">Colophon</span>
          <p className="colophon__title">
            Achevé d'imprimer
            <em>en {toRoman(year)}</em>
          </p>
          <Ornament className="colophon__ornament" />
          <p className="colophon__credit">Conçu, composé et développé par Romain Girard.</p>
        </div>

        <ul className="colophon__socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                {social.icon} {social.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#header" className="colophon__top">
          <FiArrowUp aria-hidden="true" /> Retour à la page de titre
        </a>
      </div>

      <p className="colophon__legal">© {year} Romain Girard · Tous droits réservés</p>
    </footer>
  );
};

export default Footer;
