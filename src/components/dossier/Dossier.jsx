import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { useMediaQuery } from "../book/Book";
import { Ornament } from "../book/pages";
import "../paper/paper.css";
import "./dossier.css";

const RING_TEXT = "ROMAIN GIRARD ★ DÉVELOPPEUR WEB ★ FORMATEUR ★";
const STAMP_ANGLES = [-8, 5, -3];

// Round rubber stamp: name around the edge, figure in the middle
const Stamp = ({ id, value, label, angle, delay }) => (
  <span className="stamp" style={{ "--angle": `${angle}deg`, "--delay": `${delay}s` }}>
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id={id} d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
      </defs>
      <circle cx="60" cy="60" r="56" strokeWidth="2.6" />
      <circle cx="60" cy="60" r="51" strokeWidth="1" />
      <circle cx="60" cy="60" r="34" strokeWidth="1" />
      <text className="stamp__ring">
        <textPath href={`#${id}`} textLength="268" lengthAdjust="spacing">
          {RING_TEXT}
        </textPath>
      </text>
      <text className="stamp__value" x="60" y={label.length > 1 ? 61 : 65}>
        {value}
      </text>
      {label.map((line, i) => (
        <text key={line} className="stamp__label" x="60" y={(label.length > 1 ? 74 : 79) + i * 9}>
          {line}
        </text>
      ))}
    </svg>
    <span className="sr-only">
      {value} {label.join(" ")}
    </span>
  </span>
);

const Paperclip = () => (
  <svg className="paperclip" viewBox="0 0 18 50" aria-hidden="true">
    <defs>
      <linearGradient id="paperclip-metal" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#8d949b" />
        <stop offset="0.45" stopColor="#eef1f3" />
        <stop offset="1" stopColor="#7c838a" />
      </linearGradient>
    </defs>
    <path d="M6 16 V38 a3 3 0 0 0 6 0 V9 a5 5 0 0 0 -10 0 V40 a7 7 0 0 0 14 0 V14" />
  </svg>
);

const Polaroid = ({ photo }) => (
  <figure className="polaroid">
    <Paperclip />
    <img src={photo} alt="Portrait de Romain Girard" draggable="false" />
    <figcaption>Romain</figcaption>
  </figure>
);

// Ruled index card, French "fiche bristol" style
const IndexCard = ({ tools }) => (
  <div className="bristol">
    <span className="bristol__title">Boîte à outils</span>
    <ul>
      {tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>
  </div>
);

// The CV sits in the folder's pocket; the whole thing downloads it
const CvPocket = ({ cv }) => (
  <a className="cv" href={cv} download>
    <span className="cv__sheet" aria-hidden="true">
      <span className="cv__title">Curriculum vitæ</span>
      <span className="cv__name">Romain Girard</span>
      <span className="cv__lines">
        <i />
        <i />
        <i />
        <i />
      </span>
    </span>
    <span className="cv__pocket" aria-hidden="true" />
    <span className="cv__btn">
      <FiDownload aria-hidden="true" /> Télécharger le CV
    </span>
  </a>
);

const Sheet = ({ stats, children }) => (
  <div className="sheet">
    <span className="sheet__eyebrow">Dossier</span>
    <h3 className="sheet__title">Qui suis-je ?</h3>
    <Ornament className="sheet__ornament" />
    <div className="sheet__text">{children}</div>
    <span className="sheet__sign" aria-hidden="true">
      Romain Girard
    </span>
    <div className="sheet__stamps">
      {stats.map((stat, i) => (
        <Stamp
          key={stat.value}
          id={`stamp-ring-${i}`}
          value={stat.value}
          label={stat.label}
          angle={STAMP_ANGLES[i % STAMP_ANGLES.length]}
          delay={0.25 * i}
        />
      ))}
    </div>
  </div>
);

const CoverLabel = () => (
  <div className="cover-label">
    <span className="cover-label__kind">Dossier</span>
    <span className="cover-label__name">Romain Girard</span>
    <Ornament className="cover-label__ornament" />
    <span className="cover-label__role">Développeur web &amp; formateur</span>
  </div>
);

const hidden = (isHidden) => (isHidden ? { "aria-hidden": true, inert: "" } : {});

/**
 * A card folder that opens by itself when it scrolls into view.
 * Wide screens: the cover swings open like a book. Narrow screens: shown open.
 */
const Dossier = ({ photo, cv, stats, tools, children }) => {
  const stacked = useMediaQuery("(max-width: 820px)");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOpen(true);
      return undefined;
    }
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = setTimeout(() => setOpen(true), 350);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (stacked) {
    return (
      <div ref={ref} className={`dossier dossier--stacked ${open ? "is-open" : ""}`}>
        <div className="dossier__board">
          <span className="dossier__tab">À propos</span>
          <div className="dossier__sheet-wrap">
            <Polaroid photo={photo} />
            <Sheet stats={stats}>{children}</Sheet>
          </div>
          <IndexCard tools={tools} />
          <CvPocket cv={cv} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`dossier dossier--spread ${open ? "is-open" : ""}`}>
      <div className="dossier__body">
        <div className="dossier__board">
          <span className="dossier__tab">À propos</span>
          <span className="dossier__under" aria-hidden="true" />
          <div className="dossier__sheet-wrap">
            <Sheet stats={stats}>{children}</Sheet>
          </div>
        </div>

        <div className="dossier__cover">
          <div
            className="dossier__face dossier__face--front"
            onClick={() => setOpen(true)}
            {...hidden(open)}
          >
            <CoverLabel />
            <button type="button" className="dossier__open" onClick={() => setOpen(true)}>
              Ouvrir le dossier <FiArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="dossier__face dossier__face--back" {...hidden(!open)}>
            <Polaroid photo={photo} />
            <IndexCard tools={tools} />
            <CvPocket cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dossier;
