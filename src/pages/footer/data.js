import { RiLinkedinFill } from "react-icons/ri";
import { AiOutlineGithub } from "react-icons/ai";

export const links = [
  { footerId: 5, link: "#", title: "Accueil" },
  { footerId: 6, link: "#about", title: "À propos de moi" },
  { footerId: 7, link: "#services", title: "Services" },
  { footerId: 8, link: "#portfolio", title: "Portfolio" },
  { footerId: 9, link: "#contact", title: "Contact" },
];

export const socials = [
  {
    footerSocId: 10,
    link: "https://www.linkedin.com/in/rom22-devweb",
    icon: <RiLinkedinFill />,
  },
  {
    footerSocId: 11,
    link: "https://github.com/Romtouf",
    icon: <AiOutlineGithub />,
  },
];
