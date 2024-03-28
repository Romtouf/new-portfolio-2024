import React from "react";
import Card from "../../components/card/Card";

const Project = ({ project }) => {
  return (
    <Card className="portfolio__project">
      <div className="portfolio__project-image">
        <img src={project.img} alt="Images des projets du portfolio" />
      </div>
      <h4>{project.title}</h4>
      <p>{project.desc}</p>
      <div className="portfolio__project-cta">
        <a
          href={project.link}
          className="btn sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Site
        </a>
        <a
          href={project.github}
          className="btn sm primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code source
        </a>
      </div>
    </Card>
  );
};

export default Project;
