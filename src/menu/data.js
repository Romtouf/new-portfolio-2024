import { FiBookOpen, FiFeather, FiHome, FiLayers, FiUser } from "react-icons/fi";

// "link" is the id of the section
const data = [
  { link: "header", title: "Accueil", icon: <FiHome /> },
  { link: "about", title: "À propos de moi", icon: <FiUser /> },
  { link: "competences", title: "Compétences", icon: <FiLayers /> },
  { link: "portfolio", title: "Portfolio", icon: <FiBookOpen /> },
  { link: "contact", title: "Contact", icon: <FiFeather /> },
];

export default data;
