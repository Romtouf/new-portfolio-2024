import React from "react";
import "./services.css";
import Carousel from "../../components/carousel/Carousel";
import SectionTitle from "../../components/section-title/SectionTitle";

const Services = () => {
  return (
    <section id="competences">
      <SectionTitle part="II" title="Compétences">
        Je vous présente l'ensemble des langages, frameworks et librairies appris lors de ma
        formation, et que je continue d'approfondir.
      </SectionTitle>
      <div className="container services__container" data-aos="fade-up">
        <Carousel />
      </div>
    </section>
  );
};

export default Services;
