import React from "react";
import "../navbar/navbar.css";
import Logo from "../../assets/photo-profil.webp";
import data from "./data";
import { IoColorPalette } from "react-icons/io5";
import { useModalContext } from "../../context/modal-context";

const Navbar = () => {
  const { showModalHandler } = useModalContext();
  return (
    <nav id="navbar">
      <div className="container nav__container">
        <a href="index.html" className="nav__logo">
          <img src={Logo} alt="Profil" />
        </a>
        <ul className="nav__menu">
          {data.map((item) => (
            <li key={item.navbarId}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
        <button id="theme__icon" onClick={showModalHandler}>
          <IoColorPalette />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
