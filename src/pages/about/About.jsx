import React from "react";
import "../about/about.css";
import AboutImage from "../../assets/img-profil.webp";
import CV from "../../assets/romain-girard-cv.pdf";
import Dossier from "../../components/dossier/Dossier";
import SectionTitle from "../../components/section-title/SectionTitle";
import { stats, tools } from "./data";

const About = () => {
  return (
    <section id="about">
      <SectionTitle part="I" title="À propos de moi">
        Mon parcours, mes outils et mon CV, réunis dans un dossier.
      </SectionTitle>
      <div className="container about__container" data-aos="fade-up">
        <Dossier photo={AboutImage} cv={CV} stats={stats} tools={tools}>
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
        </Dossier>
      </div>
    </section>
  );
};

export default About;
