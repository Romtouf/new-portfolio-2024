import React from "react";
import "../contact/contact.css";
import contacts from "./data";

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contactez-moi</h2>
      <p>Envoyez-moi un message par email grâce au lien ci-dessous.</p>
      <div className="container contact__container" data-aos="fade-up">
        {contacts.map((contact) => (
          <a
            key={contact.contactId}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
