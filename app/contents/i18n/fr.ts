import { plural } from "typed-locale";
import { Translations } from "./en";

export const fr: Translations = {
  locale: "fr",
  flag: "🇫🇷",
  lang: "Français",
  home: {
    title: "Développeur Full Stack Freelance",
    description:
      "Salut 👋, je suis Simon un développeur full stack freelance. Je développe des applications web et mobiles. J'aide les entreprises à construire leurs MVPs et à faire évoluer leurs produits. N'hésitez pas à me contacter pour discuter de votre projet.",
    contact_me: "Me contacter",
    who_am_i: "Qui suis-je?",
    my_background: `Je suis développeur full stack avec 4 ans d'expérience. J'ai commencé mes études avec un master en physique. Pendant mes études, j'ai appris la programmation et j'ai adoré ça et j'ai ensuite appris les technologies web en tant que hobby. J'ai commencé ma carrière en tant qu'ingénieur laser mais mon hobby est devenu ma passion et j'ai décidé de me réorienter. J'ai travaillé pendant 3 ans en tant que développeur full stack dans une startup et je suis devenu freelance en 2022.`,
    why_i_love_my_job: "Pourquoi j'aime mon travail?",
    why_i_love_my_job_description: `La première raison est que j'aime le développement web est que j'aime la logique et la résolution de problèmes. Mais si le web n'était qu'une question de logique, il ne pourrait pas devenir ma passion. Ma passion consiste également à construire des produits dont les gens ont besoin. La créativité fait également partie intégrante de mon travail, ainsi que la connaissance du produit et des questions business.`,
    how_i_work: "Comment je travaille?",
    how_i_work_description: `Je travaille à distance. Je suis disponible pour travailler sur votre projet à temps partiel ou à temps plein en fonction de vos besoins et de ma disponibilité. Mon travail ne s'arrête pas après ma première mission. Mon souci est de construire une relation à long terme avec mes clients et de les aider à faire évoluer leurs produits. J'adore aussi le produit, donc je peux vous aider à le définir et à travailler en étroite collaboration avec votre équipe. Mon objectif principal est de fournir le meilleur retour sur investissement à mes clients et pour cela je peux vous aider à prioriser les fonctionnalités à implémenter en tenant compte de la valeur pour vos utilisateurs et de la complexité technique.`,
    achievements: "Réalisations",
    achievements_description: `Voici quelques-unes de mes réalisations. Certaines sont des projets personnels et d'autres sont des projets sur lesquels j'ai travaillé en tant que freelance.`,
    silbo: "Silbo",
    silbo_description: `La première solution centralisée d’aide à la décision pour épauler les soignants au quotidien.`,
    atypique_radio: "Atypique Radio",
    atypique_radio_description: `Atypique Radio est une web radio indépendante qui diffuse une musique éclectique positive.`,
    linote: "Linote",
    linote_description: `Le moyen le plus simple pour appeler un proche âgé en vidéo`,
    mon_pont_chaban: "Mon Pont Chaban",
    mon_pont_chaban_description: `Les horaires du pont Chaban-Delmas de Bordeaux en temps réel. Tenez vous informé des prochaines fermetures en un coup d'oeil.`,
    questovery: "Questovery",
    questovery_description: `Questovery est une application pour créer des jeux de pistes. Créez et partagez vos jeux de piste avec vos amis.`,
    vaerdi: "Vaerdi",
    vaerdi_description: `Vaerdi est une société de conseil en en gestion de patrimoine.`,
    book_a_call: "Prendre un rendez-vous",
    camping_car_park: "Camping Car Park",
    camping_car_park_description: `Camping Car Park est le premier réseau d'aires de stationnement pour camping-cars en Europe.`,
  },
  article: {
    estimatedReadingTime: plural({
      none: "Temps de lecture estimé: 0 minute",
      one: "Temps de lecture estimé: 1 minute",
      other: "Temps de lecture estimé: {{count}} minutes",
    }),
    previous: "Précédent",
    next: "Suivant",
  },
  sidebar: {
    blog: "Blog",
    documentation: "Documentation",
    toggleDocumentationMenu: "Basculer le menu de documentation",
  },
  header: {
    docs: "Docs",
    blog: "Blog",
  },
  search: {
    placeholder: "Rechercher dans la documentation...",
    submit: "Rechercher",
    noResults: "Aucun résultat trouvé",
  },
  footer: {
    site: "Site",
    blog: "Blog",
    contact: "Contact",
    docs: "Docs",
    home: "Accueil",
    pricing: "Tarifs",
    legal: "Mentions légales",
    links: "Liens",
    privacy: "Politique de confidentialité",
  },
};
