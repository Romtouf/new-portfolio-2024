import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { AiFillAppstore } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";

const data = [
  {
    link: "",
    title: "Accueil",
    icon: <AiFillHome />,
  },
  {
    link: "about",
    title: "À propos de moi",
    icon: <BsPersonFill />,
  },
  {
    link: "services",
    title: "Services",
    icon: <MdHomeRepairService />,
  },
  {
    link: "portfolio",
    title: "Portfolio",
    icon: <AiFillAppstore />,
  },
  {
    link: "contact",
    title: "Contact",
    icon: <AiFillMessage />,
  },
];

export default data;
