import React, { useState } from "react";
import "./carousel.css";
import logoGit from "../../assets/git.webp";
import logoReact from "../../assets/react-logo.svg";
import logoRedux from "../../assets/redux-logo.svg";
import logoSass from "../../assets/sass.webp";
import logoHTML from "../../assets/html-logo.svg";
import logoCSS from "../../assets/css-logo.svg";
import logoJS from "../../assets/javascript-logo.svg";
import logoFigma from "../../assets/figma.webp";
import logoPHP from "../../assets/php.webp";
import logoMySQL from "../../assets/mysql.webp";
import logoAstro from "../../assets/astro-logo.svg";
import logoTailwind from "../../assets/tailwind-logo.svg";
import logoHTMX from "../../assets/htmx.png";
import logoAlpine from "../../assets/alpinejs.png";
import logoC from "../../assets/c-language-seeklogo.png";
import logoNextjs from "../../assets/nextjs.svg";
import logoPostgres from "../../assets/postgresql.svg";
import logoTypeScript from "../../assets/typescript.webp";
import logoPrisma from "../../assets/prisma.webp";

// Wide logos (text) alternate with compact ones so neighbours don't overlap.
const logos = [
  { src: logoReact, name: "React" },
  { src: logoTailwind, name: "Tailwind CSS" },
  { src: logoHTML, name: "HTML" },
  { src: logoGit, name: "Git" },
  { src: logoCSS, name: "CSS" },
  { src: logoAstro, name: "Astro" },
  { src: logoJS, name: "JavaScript" },
  { src: logoHTMX, name: "htmx" },
  { src: logoTypeScript, name: "TypeScript" },
  { src: logoAlpine, name: "Alpine.js" },
  { src: logoNextjs, name: "Next.js" },
  { src: logoPrisma, name: "Prisma" },
  { src: logoPostgres, name: "PostgreSQL" },
  { src: logoPHP, name: "PHP" },
  { src: logoC, name: "C" },
  { src: logoMySQL, name: "MySQL" },
  { src: logoSass, name: "Sass" },
  { src: logoRedux, name: "Redux" },
  { src: logoFigma, name: "Figma" },
];

// Every logo covers about the same visible area, whatever its shape,
// and fits inside its label (see .carousel__card).
const TARGET_AREA = 50 * 50;
const MAX_WIDTH = 80;
const MAX_HEIGHT = 52;

const FULL = { x: 0, y: 0, w: 1, h: 1 };
const boxes = new Map();

/** Part of the image that is actually drawn (transparent margins ignored), as fractions. */
const visibleBox = (img) => {
  const natW = img.naturalWidth || 300;
  const natH = img.naturalHeight || 300;
  const scale = 200 / Math.max(natW, natH);
  const w = Math.max(1, Math.round(natW * scale));
  const h = Math.max(1, Math.round(natH * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  try {
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    let x0 = w;
    let y0 = h;
    let x1 = -1;
    let y1 = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > 16) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    if (x1 < 0) return FULL;
    return { x: x0 / w, y: y0 / h, w: (x1 - x0 + 1) / w, h: (y1 - y0 + 1) / h };
  } catch {
    return FULL; // canvas not readable: keep the whole image
  }
};

const fitStyle = (img, box) => {
  const ratio = ((img.naturalWidth || 1) * box.w) / ((img.naturalHeight || 1) * box.h);
  let width = Math.sqrt(TARGET_AREA * ratio);
  let height = width / ratio;
  if (width > MAX_WIDTH) {
    width = MAX_WIDTH;
    height = width / ratio;
  }
  if (height > MAX_HEIGHT) {
    height = MAX_HEIGHT;
    width = height * ratio;
  }
  const imgW = width / box.w;
  const imgH = height / box.h;
  return {
    frame: { width, height },
    img: { width: imgW, height: imgH, left: -box.x * imgW, top: -box.y * imgH },
  };
};

const Logo = ({ src, name }) => {
  const [style, setStyle] = useState(null);

  const onLoad = (e) => {
    const img = e.currentTarget;
    if (!boxes.has(src)) boxes.set(src, visibleBox(img));
    setStyle(fitStyle(img, boxes.get(src)));
  };

  return (
    <span className={`carousel__logo ${style ? "is-ready" : ""}`} style={style?.frame}>
      <img src={src} alt={name} onLoad={onLoad} style={style?.img} draggable="false" />
    </span>
  );
};

const Carousel = () => {
  return (
    <div className="carousel__stage">
      <div className="carousel__tilt">
        <span className="carousel__shadow" aria-hidden="true" />
        <span className="carousel__orbit" aria-hidden="true" />
        <div className="carousel">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="carousel__face"
              style={{ "--rotate": `${index * (360 / logos.length)}deg` }}
            >
              {/* Paper label, turned to always face the visitor */}
              <span className="carousel__card">
                <Logo src={logo.src} name={logo.name} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
