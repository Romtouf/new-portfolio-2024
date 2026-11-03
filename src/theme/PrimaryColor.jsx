import React from "react";
import { useThemeContext } from "../context/theme-context";

// A wax drop showing the real ink colour of the theme
const PrimaryColor = ({ className, hue, name }) => {
  const { themeState, themeHandler } = useThemeContext();
  const selected = themeState.primary === className;

  return (
    <button
      type="button"
      className={`theme__swatch ${selected ? "is-selected" : ""}`}
      style={{ "--hue": hue }}
      onClick={() => themeHandler(className)}
      aria-pressed={selected}
    >
      <span className="theme__swatch-drop" aria-hidden="true" />
      <span className="theme__swatch-name">{name}</span>
    </button>
  );
};

export default PrimaryColor;
