import React from "react";
import "../about/about.css";
import AboutImage from "../../assets/img-profil.webp";
import CV from "../../assets/romain-girard-cv.pdf";
import { IoMdDownload } from "react-icons/io";
import Card from "../../components/card/Card";
import data from "./data";

const About = () => {
  return (
    <section id="about" data-aos="fade-in">
      <div className="container about__container">
        <div className="about__left">
          <div className="about__portrait">
            <img src={AboutImage} alt="Profil" />
          </div>
        </div>
        <div className="about__right">
          <h2>À propos de moi</h2>
          <div className="about__cards">
            {data.map((item) => (
              <Card key={item.aboutId} className="about__card">
                <span className="about__card-icon">{item.icon}</span>
                <h5>{item.title}</h5>
                <small>{item.desc}</small>
              </Card>
            ))}
          </div>
          <p>
            Créer des projets est ma passion. Je suis entré dans le monde du
            développement il y a plus d'un an maintenant.
          </p>
          <p>
            Je m'appelle Romain Girard. Je suis développeur front-end. J'ai
            choisi de me reconvertir dans ce domaine et obtenu le diplôme de
            développeur web en novembre 2023. Je réalise des sites web en HTML,
            CSS, JavaScript, React et Redux.
          </p>
          <a href={CV} download className="btn primary">
            Télécharger le CV <IoMdDownload />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
