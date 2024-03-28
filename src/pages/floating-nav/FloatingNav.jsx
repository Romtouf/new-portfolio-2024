import React from "react";
import "../floating-nav/floatingNav.css";
import data from "../../menu/data";
import Scrollspy from "react-scrollspy";
import Nav from "./Nav";

const FloatingNav = () => {
  const items = ["header"];

  data.forEach(({ link }) => {
    if (!link) return;

    items.push(link);
  });

  return (
    <ul id="floating__nav">
      <Scrollspy
        offset={-500}
        className="scrollspy"
        items={items}
        currentClassName="active"
      >
        {data.map((item) => (
          <Nav key={item.floatId} item={item} />
        ))}
      </Scrollspy>
    </ul>
  );
};

export default FloatingNav;
