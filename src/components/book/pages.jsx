import React from "react";
import { FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";

const ROMAN = [
  ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90],
  ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
];

export const toRoman = (num) =>
  ROMAN.reduce((out, [letter, value]) => {
    while (num >= value) {
      out += letter;
      num -= value;
    }
    return out;
  }, "");

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

// Links and buttons inside a page must not turn the page.
const stop = (e) => e.stopPropagation();

export const Ornament = ({ className = "" }) => (
  <svg className={`ornament ${className}`} viewBox="0 0 120 12" aria-hidden="true">
    <line x1="0" y1="6" x2="46" y2="6" />
    <circle cx="50.5" cy="6" r="1.3" />
    <path d="M60 0.8 L65.2 6 L60 11.2 L54.8 6 Z" />
    <circle cx="69.5" cy="6" r="1.3" />
    <line x1="74" y1="6" x2="120" y2="6" />
  </svg>
);

const Head = ({ left, right }) => (
  <div className="pg__head">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const Folio = ({ n }) => <span className="pg__folio">{n}</span>;

const ProjectLinks = ({ project }) => (
  <div className="story__links">
    {project.link && (
      <a
        href={project.link}
        className="story__link"
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
      >
        {project.linkLabel || "Visiter le site"} <FiArrowUpRight aria-hidden="true" />
      </a>
    )}
    {project.github && (
      <a
        href={project.github}
        className="story__link story__link--ghost"
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
      >
        <FiGithub aria-hidden="true" /> Code source
      </a>
    )}
  </div>
);

/* ---------- Boards ---------- */

export const Cover = ({ count }) => (
  <div className="pg pg--cover">
    <div className="cover__frame">
      <span className="cover__author">Romain Girard</span>
      <Ornament className="ornament--gold" />
      <p className="cover__title gold">
        Carnet
        <em>de projets</em>
      </p>
      <Ornament className="ornament--gold" />
      <span className="cover__subtitle">Développement web &amp; applications</span>
      <span className="cover__edition">
        Vol. I &nbsp;·&nbsp; {count} chapitres
      </span>
    </div>
    <span className="cover__hint">
      Ouvrir <FiArrowRight aria-hidden="true" />
    </span>
  </div>
);

export const Endpaper = ({ side, children }) => (
  <div className={`pg pg--endpaper is-${side}`}>
    <div className="endpaper__paper">{children}</div>
  </div>
);

export const ExLibris = () => (
  <Endpaper side="left">
    <div className="exlibris">
      <span className="exlibris__label">Ex libris</span>
      <span className="exlibris__name">Romain Girard</span>
      <span className="exlibris__role">Développeur web &amp; formateur</span>
      <Ornament />
      <span className="exlibris__motto">
        « Transformer les idées en solutions digitales. »
      </span>
    </div>
  </Endpaper>
);

export const Monogram = () => (
  <Endpaper side="right">
    <span className="monogram" aria-hidden="true">
      RG
    </span>
  </Endpaper>
);

export const PaperBack = () => <div className="pg pg--paper pg--blank" />;

/* ---------- Pages ---------- */

export const Sommaire = ({ projects, pageOf, epiloguePage, onGo, folio }) => (
  <div className="pg pg--paper">
    <Head left="Carnet de projets" right="Sommaire" />
    <div className="toc">
      <span className="eyebrow">Table des matières</span>
      <h3 className="toc__title">Sommaire</h3>
      <Ornament />
      <ol className="toc__list">
        {projects.map((project, i) => (
          <li key={project.portId}>
            <button
              type="button"
              className="toc__item"
              onClick={(e) => {
                stop(e);
                onGo(i + 2);
              }}
            >
              <span className="toc__num">{toRoman(i + 1)}</span>
              <span className="toc__text">
                <span className="toc__name">{project.title}</span>
                <span className="toc__cat">{project.category}</span>
              </span>
              <span className="toc__dots" />
              <span className="toc__page">{pageOf(i)}</span>
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="toc__item toc__item--epilogue"
            onClick={(e) => {
              stop(e);
              onGo(projects.length + 2);
            }}
          >
            <span className="toc__num">✦</span>
            <span className="toc__text">
              <span className="toc__name">Épilogue</span>
            </span>
            <span className="toc__dots" />
            <span className="toc__page">{epiloguePage}</span>
          </button>
        </li>
      </ol>
    </div>
    <Folio n={folio} />
  </div>
);

export const Plate = ({ project, index, folio }) => {
  const roman = toRoman(index + 1);
  return (
    <div className="pg pg--paper">
      <Head left={`Chapitre ${roman}`} right="" />
      <div className="plate">
        <span className="eyebrow">Chapitre</span>
        <span className="plate__numeral">{roman}</span>
        <figure className="plate__figure">
          <div className="plate__frame">
            <img src={project.img} alt={`Aperçu du projet ${project.title}`} draggable="false" />
          </div>
          <figcaption>
            <em>Fig. {roman}</em> — {project.title}
            {project.link && <span className="plate__host">{hostOf(project.link)}</span>}
          </figcaption>
        </figure>
      </div>
      <Folio n={folio} />
    </div>
  );
};

export const Story = ({ project, index, folio }) => (
  <div className="pg pg--paper">
    <Head left="" right={project.category} />
    <span className="story__watermark" aria-hidden="true">
      {String(index + 1).padStart(2, "0")}
    </span>
    <div className="story">
      <span className="eyebrow">{project.category}</span>
      <h3 className="story__title">{project.title}</h3>
      <Ornament />
      <p className="story__desc">{project.desc}</p>
      <ProjectLinks project={project} />
    </div>
    <Folio n={folio} />
  </div>
);

/** Phone layout: picture and text on the same page. */
export const StoryCompact = ({ project, index, folio }) => (
  <div className="pg pg--paper pg--compact">
    <Head left={`Chapitre ${toRoman(index + 1)}`} right={project.category} />
    <div className="story">
      <div className="plate__frame">
        <img src={project.img} alt={`Aperçu du projet ${project.title}`} draggable="false" />
      </div>
      <h3 className="story__title">{project.title}</h3>
      <Ornament />
      <p className="story__desc">{project.desc}</p>
      <ProjectLinks project={project} />
    </div>
    <Folio n={folio} />
  </div>
);

export const Epilogue = ({ folio }) => (
  <div className="pg pg--paper">
    <Head left="Épilogue" right="" />
    <div className="epilogue">
      <span className="eyebrow">Épilogue</span>
      <h3 className="epilogue__title">
        Et le prochain
        <em>chapitre ?</em>
      </h3>
      <Ornament />
      <p className="epilogue__text">
        Ce carnet n'est qu'un début. Votre projet pourrait bien en écrire la
        suite&nbsp;: parlons-en.
      </p>
      <a href="#contact" className="story__link" onClick={stop}>
        Écrivons-le ensemble <FiArrowRight aria-hidden="true" />
      </a>
      <span className="epilogue__end">À suivre…</span>
    </div>
    <Folio n={folio} />
  </div>
);
