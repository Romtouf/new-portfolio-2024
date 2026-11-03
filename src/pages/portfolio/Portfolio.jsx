import React, { useEffect, useMemo, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "../portfolio/portfolio.css";
import data from "./data";
import Book, { useBook, useMediaQuery } from "../../components/book/Book";
import {
  Cover,
  Endpaper,
  Epilogue,
  ExLibris,
  Monogram,
  PaperBack,
  Plate,
  Sommaire,
  Story,
  StoryCompact,
  toRoman,
} from "../../components/book/pages";
import SectionTitle from "../../components/section-title/SectionTitle";

/*
  Positions (same on desktop and phone):
  0 = cover, 1 = table of contents, 2..n+1 = projects, n+2 = epilogue.
*/
const Portfolio = () => {
  const single = useMediaQuery("(max-width: 720px)");
  const count = data.length;
  const maxPos = count + 2;
  const { pos, delays, goTo, next, prev } = useBook(maxPos);
  const sectionRef = useRef(null);

  const leaves = useMemo(() => {
    if (single) {
      return [
        { key: "s-cover", front: <Cover count={count} />, back: <Endpaper side="left" /> },
        {
          key: "s-toc",
          front: (
            <Sommaire
              projects={data}
              pageOf={(i) => i + 2}
              epiloguePage={count + 2}
              onGo={goTo}
              folio={1}
            />
          ),
          back: <PaperBack />,
        },
        ...data.map((project, i) => ({
          key: `s-${project.portId}`,
          front: <StoryCompact project={project} index={i} folio={i + 2} />,
          back: <PaperBack />,
        })),
        { key: "s-end", front: <Epilogue folio={count + 2} />, back: <PaperBack /> },
      ];
    }

    // Desktop: each project is a spread, picture on the left, text on the right.
    const epilogue = <Epilogue folio={2 * (count + 1)} />;
    return [
      { key: "d-cover", front: <Cover count={count} />, back: <ExLibris /> },
      {
        key: "d-toc",
        front: (
          <Sommaire
            projects={data}
            pageOf={(i) => 2 * (i + 1)}
            epiloguePage={2 * (count + 1)}
            onGo={goTo}
            folio={1}
          />
        ),
        back: data[0] ? <Plate project={data[0]} index={0} folio={2} /> : epilogue,
      },
      ...data.map((project, i) => ({
        key: `d-${project.portId}`,
        front: <Story project={project} index={i} folio={2 * (i + 1) + 1} />,
        back: data[i + 1] ? (
          <Plate project={data[i + 1]} index={i + 1} folio={2 * (i + 2)} />
        ) : (
          epilogue
        ),
      })),
    ];
  }, [single, count, goTo]);

  // Arrow keys turn the pages while the section is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );
    io.observe(section);

    const onKey = (e) => {
      if (!visible || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev]);

  const label =
    pos === 0
      ? "Couverture"
      : pos === 1
      ? "Sommaire"
      : pos === maxPos
      ? "Épilogue"
      : `Chapitre ${toRoman(pos - 1)} · ${data[pos - 2].title}`;

  const hint =
    pos === 0
      ? "Cliquez sur la couverture pour ouvrir le carnet"
      : single
      ? "Touchez la page ou faites-la glisser pour la tourner"
      : "Cliquez sur une page, faites-la glisser ou utilisez les flèches ← → du clavier";

  return (
    <section id="portfolio" ref={sectionRef}>
      <SectionTitle part="III" title="Projets récents">
        Feuilletez ce carnet pour découvrir une sélection de mes réalisations récentes, du
        développement web aux applications innovantes. Chaque chapitre raconte un projet.
      </SectionTitle>
      <div className="container folio" data-aos="fade-up">
        <div className="folio__stage">
          <Book
            leaves={leaves}
            base={single ? null : <Monogram />}
            pos={pos}
            delays={delays}
            single={single}
            onNext={next}
            onPrev={prev}
            label="Carnet de projets"
          />
        </div>

        <div className="folio__controls">
          <button
            type="button"
            className="folio__arrow"
            onClick={prev}
            disabled={pos === 0}
            aria-label="Page précédente"
          >
            <FiArrowLeft aria-hidden="true" />
          </button>
          <div className="folio__status">
            <span className="folio__label" aria-live="polite">
              {label}
            </span>
            <span className="folio__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${pos / maxPos})` }} />
            </span>
          </div>
          <button
            type="button"
            className="folio__arrow"
            onClick={next}
            disabled={pos === maxPos}
            aria-label="Page suivante"
          >
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
        <p className="folio__hint">{hint}</p>
      </div>
    </section>
  );
};

export default Portfolio;
