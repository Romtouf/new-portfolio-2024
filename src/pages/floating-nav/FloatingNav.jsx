import React from "react";
import "../floating-nav/floatingNav.css";
import data from "../../menu/data";
import useActiveSection from "../../hooks/useActiveSection";

const sectionIds = data.map((item) => item.link);

// Tablets and phones only (see CSS). Hidden on the title page, where it
// would cover the buttons.
const FloatingNav = () => {
  const active = useActiveSection(sectionIds);

  return (
    <nav
      id="floating__nav"
      className={active === sectionIds[0] ? "is-hidden" : undefined}
      aria-label="Navigation rapide"
    >
      <ul>
        {data.map((item) => (
          <li key={item.link}>
            <a
              href={`#${item.link}`}
              className={active === item.link ? "is-active" : undefined}
              aria-current={active === item.link ? "location" : undefined}
              aria-label={item.title}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingNav;
