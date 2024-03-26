import React from "react";
import "./services.css";
import Carousel from "../../components/carousel/Carousel";

const Services = () => {
  return (
    <section id="services">
      <h2>Cursus</h2>
      <p>
        Je vous présente l'ensemble des langages, frameworks et libraires
        apprises lors de ma formation et que je continue d'approfondir.
      </p>
      <div className="container services__container">
        <Carousel />
      </div>
    </section>
  );
};

export default Services;
