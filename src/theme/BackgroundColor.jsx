import React from "react";
import { useThemeContext } from "../context/theme-context";

const BackgroundColor = ({ className, name }) => {
  const { themeState, themeHandler } = useThemeContext();
  const selected = themeState.background === className;

  return (
    <button
      type="button"
      className={`theme__background ${className} ${selected ? "is-selected" : ""}`}
      onClick={() => themeHandler(className)}
      aria-pressed={selected}
    >
      <span className="theme__background-preview" aria-hidden="true" />
      <span className="theme__background-name">{name}</span>
    </button>
  );
};

export default BackgroundColor;
