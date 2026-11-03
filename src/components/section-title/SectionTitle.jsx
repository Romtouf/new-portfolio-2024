import React from "react";
import { Ornament } from "../book/pages";
import "../paper/paper.css";
import "./section-title.css";

/** Section heading styled like a part title in a book. */
const SectionTitle = ({ part, title, children }) => (
  <div className="section-title">
    <span className="section-title__part">Partie {part}</span>
    <h2 className="section-title__heading">{title}</h2>
    <Ornament className="section-title__ornament" />
    {children && <p className="section-title__intro">{children}</p>}
  </div>
);

export default SectionTitle;
