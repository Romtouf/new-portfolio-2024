import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import "../navbar/navbar.css";
import data from "../../menu/data";
import { useModalContext } from "../../context/modal-context";
import useActiveSection from "../../hooks/useActiveSection";

const sectionIds = data.map((item) => item.link);

const Navbar = () => {
  const { showModalHandler } = useModalContext();
  const active = useActiveSection(sectionIds);

  return (
    <nav id="navbar" aria-label="Navigation principale">
      <div className="container nav__container">
        <a href="#header" className="nav__brand" aria-label="Retour à la page de titre">
          <span className="nav__seal" aria-hidden="true">
            RG
          </span>
        </a>
        <ul className="nav__menu">
          {data.map((item) => (
            <li key={item.link}>
              <a
                href={`#${item.link}`}
                className={active === item.link ? "is-active" : undefined}
                aria-current={active === item.link ? "location" : undefined}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <button
          id="theme__icon"
          type="button"
          onClick={showModalHandler}
          aria-label="Personnaliser le thème"
        >
          <IoColorPaletteOutline />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
