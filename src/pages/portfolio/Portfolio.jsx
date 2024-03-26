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
        Je vous propose de prêter attention aux projets que j'ai pu réalisés
        récemment. Utilisez le bouton pour basculer entre les différentes
        catégories.
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
