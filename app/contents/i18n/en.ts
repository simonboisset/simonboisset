import { InferTranslation, plural } from "typed-locale";

export const en = {
  locale: "en",
  flag: "🇺🇸",
  lang: "English",
  home: {
    title: "Freelance Full Stack Developer",
    description:
      "Hi 👋, I'm Simon a freelance full stack developer. I build web apps and mobile apps. I help companies to build their MVPs and to scale their products. Feel free to contact me to discuss your project.",
    contact_me: "Contact me",
    who_am_i: "Who am I?",
    my_background:
      "I'm a full stack developer with 4 years of experience. I started my studies with a master's degree in Physics. During my studies, I learned about programming and I loved it and then learned about the web technologies as a hobby. I started my career as a laser engineer but my hobby became my passion and I decided to reorient. I worked for 3 years as a full stack developer in a startup and then I became a freelance in 2022.",
    why_i_love_my_job: "Why I love my job?",
    why_i_love_my_job_description:
      "The first reason is that I love web development is that I love logic and problem solving. But if web was only about logic it couldn't become my passion. My passion is also about building products that people need. Creativity is also a big part of my job as well as being aware of the product and business.",
    how_i_work: "How I work?",
    how_i_work_description:
      "I work remotely. I am available to work on your project part-time or full-time depending on your need and my availability. My work don't stop after my first mission. My concern is to build a long-term relationship with my clients and to help them to scale their products. I like product too so I can help you to define your product and to work closely with your product team. My main goal is to deliver the best return on investment for my clients and for that I can help you to prioritize the features to implement considering the value for your users and the technical complexity.",
    achievements: "Achievements",
    achievements_description:
      "Here are some of my achievements. Some are personnal projects and some are projects I've worked on as a freelance.",
    silbo: "Silbo",
    silbo_description:
      "The first centralized decision support solution to support caregivers on a daily basis.",
    linote: "Linote",
    linote_description: "The easiest way to call an elderly relative in video",
    vaerdi: "Vaerdi",
    vaerdi_description: "Vaerdi is a wealth management consulting company.",
    atypique_radio: "Atypique Radio",
    atypique_radio_description:
      "Atypique Radio is an independent web radio that broadcasts eclectic positive music.",
    mon_pont_chaban: "Mon Pont Chaban",
    mon_pont_chaban_description:
      "The schedules of the Chaban-Delmas bridge in Bordeaux in real time.",
    questovery: "Questovery",
    questovery_description:
      "Questovery is an app to create treasure hunts. Create and share your treasure hunts with your friends.",
    book_a_call: "Book a call",
    camping_car_park: "Camping Car Park",
    camping_car_park_description:
      "Camping Car Park is the first network of motorhome parking areas in Europe.",
  },
  article: {
    estimatedReadingTime: plural({
      none: "Estimated reading time: 0 minute",
      one: "Estimated reading time: 1 minute",
      other: "Estimated reading time: {{count}} minutes",
    }),
    previous: "Previous",
    next: "Next",
  },
  sidebar: {
    blog: "Blog",
    documentation: "Documentation",
    toggleDocumentationMenu: "Toggle documentation menu",
  },
  header: {
    docs: "Docs",
    blog: "Blog",
  },
  search: {
    placeholder: "Search documentation...",
    submit: "Search",
    noResults: "No results found",
  },
  footer: {
    site: "Site",
    home: "Home",
    contact: "Contact",
    links: "Links",
    docs: "Docs",
    blog: "Blog",
    pricing: "Pricing",
    legal: "Legal",
    privacy: "Privacy",
  },
} as const;

export type Translations = InferTranslation<typeof en>;
