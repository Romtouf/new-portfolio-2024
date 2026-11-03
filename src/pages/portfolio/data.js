// Import des images
import inkbound from "../../assets/the_inkbound-adventures.webp";
import codebyrOs from "../../assets/codebyr-os.webp";

// link: main button ("Visiter le site" unless linkLabel is set)
// github: optional "Code source" button
const data = [
  {
    portId: 25,
    category: "Kotlin",
    img: inkbound,
    title: "The Inkbound Adventures",
    desc: "Jeu d'aventure au style des dessins animés des années 1930 : noir et blanc, grain d'époque et personnages à l'encre. La démo 1.3.0 propose le premier monde jouable, sur Windows et Android. Jeu développé en Kotlin.",
    link: "https://github.com/Romtouf/The_inkbound_adventures/releases/tag/v1.3.0-demo",
    linkLabel: "Télécharger la démo",
  },
  {
    portId: 24,
    category: "Linux",
    img: codebyrOs,
    title: "Codebyr OS",
    desc: "Distribution Linux basée sur Debian qui apporte la sécurité par compartimentation à tous : des Espaces isolés et colorés (Personnel, Travail, Banque, Navigation, Jetable), sans expertise technique. Réalisé avec Debian live-build, GNOME, bubblewrap et Python.",
    link: "https://os.codebyr.dev",
    github: "https://github.com/Romtouf/codebyr-os",
  },
];

export default data;
