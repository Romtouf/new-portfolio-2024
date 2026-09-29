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
            Passionné par l'innovation technologique, je me suis spécialisé dans le développement web 
            et la formation depuis plus de quatre ans. Mon parcours de reconversion m'a permis d'acquérir 
            une expertise solide dans les technologies modernes.
          </p>
          <p>
            Développeur full-stack et formateur, je maîtrise un éventail complet de technologies : 
            React, Next.js, Node.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS, et bien d'autres. 
            Mon approche allie performance technique et pédagogie, permettant de créer des solutions 
            digitales robustes tout en transmettant mes connaissances.
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
