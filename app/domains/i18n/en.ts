import { InferTranslation } from "typed-locale";

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
  },
  pricing: {
    title: "Pricing",
    use_case: "Use case",
    specifications: "Specifications",
    description:
      "I try to be as transparent as possible with my pricing. It cannot be exhaustive because each project is unique. But it gives you an idea of the price range for each type of project. There is 2 types of pricing: fixed price and hourly rate.",
    daily_rate: {
      title: "Daily rate",
      description:
        "Your project is not well defined and you need a lot of flexibility. I can work on your project for a variable number of days.",
      per_day: "/ day",
      pricing_without_vat: "Pricing not including VAT",
      flexible_scope: "Flexible scope",
      advise_on_technical_choices: "Advise on technical choices",
      budget_is_not_defined: "Budget is not defined",
    },
    project_rate: {
      title: "Project rate",
      simulate_your_project: "Simulate your project",
      description:
        "Your project is well defined and you need a fixed price. I can deliver your project for a fixed price. If the price is too high, I can help you to reduce the scope of the project and to prioritize the features to implement.",
      fixed_price: "Fixed price",
      fixed_scope: "Fixed scope",
      advise_on_scope_definition: "Advise on scope definition",
    },
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
  blog: {
    title: "Blog",
  },
  consent: {
    bannerTitle: "My website uses cookies",
    bannerDescription:
      "We use cookies to offer you a better user experience and to analyze the traffic on our website.",
    bannerThanksForTakingTime:
      "Thank you for taking a few seconds to give your consent.",
    whatAreYourCookiesUsedFor: "What are your cookies used for?",
    shareDataToGoogle:
      "Share data, analytics, advertising, user and advertising personalization data with Google",
    authoriseGoogleAnalyticsToMeasureYourUseOfOurWebsiteToImproveOurServices:
      "Authorise Google Analytics to measure your use of our website to improve our services.",
    authoriseGoogleAnalyticsToSaveAdvertisingInformationToOfferYouPersonalisedAds:
      "Authorise Google Analytics to save advertising information to offer you personalised ads.",
    authoriseGoogleAnalyticsToCollectUserDataToOfferYouPersonalisedAds:
      "Authorise Google Analytics to collect user data to offer you personalised ads.",
    authoriseGoogleAnalyticsToCustomiseTheAdsYouSeeOnOurWebsite:
      "Authorise Google Analytics to customise the ads you see on our website.",
    acceptAll: "Accept all",
    denyAll: "Deny all",
    save: "Save",
    seeDetails: "See details",
  },
  cta: {
    heyImSimon:
      "👋 Hey, I'm Simon, I'm a freelance full stack developer. I build web apps and mobile apps.",
    iCanHelpYou:
      "📱 If you are building a product like a web app or a mobile app, I can help you to build it.",
  },
};

export type Translation = InferTranslation<typeof en>;
