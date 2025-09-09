import React from "react";
import "../portfolio/portfolio.css";
import ProjectsCategories from "../../components/projectsCategories/ProjectsCategories";
import Projects from "../../components/projects/Projects";
import data from "./data";
import { useState } from "react";

const Portfolio = () => {
  const [projects, setProjects] = useState(data);

  const categories = data.map((item) => item.category);
  const uniqueCategories = ["all", ...new Set(categories)];

  const filterProjectsHandler = (category) => {
    if (category === "all") {
      setProjects(data);
      return;
    }
    const filteredProjects = data.filter(
      (project) => project.category === category
    );
    setProjects(filteredProjects);
  };

  return (
    <section id="portfolio">
      <h2>Projets récents</h2>
      <p>
        Découvrez une sélection de mes réalisations récentes, allant du développement web 
        aux applications innovantes. Explorez les différentes catégories pour voir 
        l'étendue de mes compétences techniques et créatives.
      </p>
      <div className="container portfolio__container">
        <ProjectsCategories
          categories={uniqueCategories}
          onFilterProjects={filterProjectsHandler}
        />
        <Projects projects={projects} />
      </div>
    </section>
  );
};

export default Portfolio;
