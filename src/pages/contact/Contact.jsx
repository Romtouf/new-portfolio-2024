import React from "react";
import "../contact/contact.css";
import contact from "./data";
import Envelope from "../../components/envelope/Envelope";
import SectionTitle from "../../components/section-title/SectionTitle";

const Contact = () => {
  return (
    <section id="contact">
      <SectionTitle part="IV" title="Contactez-moi">
        Une idée, un projet, une question ? Ouvrez l'enveloppe et écrivez-moi.
      </SectionTitle>
      <div className="container contact__container" data-aos="fade-up">
        <Envelope email={contact.email} subject={contact.subject} />
      </div>
    </section>
  );
};

export default Contact;
