import React from "react";
import { links, socials } from "./data";
import "../footer/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="container footer__container">
        <ul className="nav__menu">
          {links.map((fLink) => (
            <li key={fLink.footerId}>
              <a href={fLink.link}>{fLink.title}</a>
            </li>
          ))}
        </ul>
        <div className="footer__socials">
          {socials.map((social) => (
            <a
              key={social.footerSocId}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="footer__copyright">
        <small>© {year} All right reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
