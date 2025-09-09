// Import des images
import uspManager from "../../assets/usp-manager.webp";
import pbernard from "../../assets/pbernard.webp";
import histoireMagique from "../../assets/histoire-magique.webp";
import fossoyeurfc from "../../assets/fossoyeurfc.webp";
import tonTournoi from "../../assets/ton-tournoi.webp";
import cubFirst from "../../assets/cubFirst.webp";

const data = [
  {
    portId: 19,
    category: "Next JS",
    img: uspManager,
    title: "USP Manager",
    desc: "Application de gestion des utilisateurs qui auront la possibilité de créer et gérer leur équipe. Planification des évènements et des vacances, chatbot, chat en temps réel. Site réalisé avec Next JS, Tailwind CSS, Prisma, PostgreSQL.",
    link: "https://uspmanager.codebyr.dev",
    // github: "",
  },
  {
    portId: 20,
    category: "Astro JS",
    img: pbernard,
    title: "Pierre Bernard - Massothérapeute",
    desc: "Ce projet a été réalisé pour un client qui souhaite présenter ses services de massothérapie. Le site est créé avec Astro JS, Tailwind CSS et Alpine JS. Site optimisé pour un SEO performant.",
    link: "https://pierre-bernard.net",
    // github: "",
  },
  {
    portId: 21,
    category: "IA",
    img: histoireMagique,
    title: "Histoire magique",
    desc: "Application de création de récits avec IA. Site réalisé avec Next JS, Tailwind CSS, Prisma, PostgreSQL.",
    link: "https://histoire-magique.fr",
    // github: "",
  },
  {
    portId: 22,
    category: "Next JS",
    img: fossoyeurfc,
    title: "Fossoyeur FC",
    desc: "Jeu de gestion de club de football. Version beta. Site réalisé avec Next JS, Tailwind CSS, Prisma, PostgreSQL.",
    link: "https://fossoyeurfc.codebyr.dev",
    // github: "",
  },
  {
    portId: 23,
    category: "Next JS",
    img: tonTournoi,
    title: "Ton tournoi",
    desc: "Application de création de tournoi. Alogrithmique de tournois complexes. Site réalisé avec Next JS, Tailwind CSS, Prisma, PostgreSQL.",
    link: "https://ton-tournoi.codebyr.dev",
    // github: "",
  },
  {
    portId: 24,
    category: "Framework",
    img: cubFirst,
    title: "cubFirst",
    desc: "Création d'un micro framework HTML-first. Réalisé avec TypeScript.",
    // link: "",
    github: "https://github.com/Romtouf/cubFirst",
  },
];

export default data;
