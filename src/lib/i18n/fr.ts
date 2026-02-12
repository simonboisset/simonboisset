import type { Translations } from "./en";

export const fr: Translations = {
	locale: "fr",
	seo: {
		homeTitle:
			"Développeur full-stack orienté mobile (React Native, Expo, React)",
		homeDescription:
			"Développeur freelance mobile + full-stack spécialisé en React Native, Expo et applications web modernes.",
		blogTitle: "Blog",
		cvTitle: "CV",
		cvDescription:
			"CV de Simon Boisset, développeur full-stack orienté mobile (React Native, Expo, React, TypeScript).",
	},
	nav: {
		brand: "Simon Boisset",
		tagline: "Mobile + Full-stack",
		home: "Accueil",
		about: "À propos",
		services: "Services",
		products: "Produits",
		saasStarter: "Keystone Stack",
		projects: "Projets",
		testimonials: "Témoignages",
		blog: "Blog",
		blogAll: "Voir tous les articles",
		bookCall: "Réserver un appel",
		aboutItems: {
			services: "Comment j'aide les équipes à livrer du mobile.",
			projects: "Projets récents et résultats concrets.",
			testimonials: "Retours clients sur la livraison et la collaboration.",
			github: "Open source, prototypes et exemples de code.",
		},
	},
	footer: {
		description:
			"Développeur freelance mobile + full-stack. React Native, Expo, React, TypeScript.",
		scheduleCall: "Planifier un appel",
		blog: "Blog",
		docs: "Docs",
		manageConsent: "Gérer le consentement",
		github: "GitHub",
	},
	consent: {
		title: "Consentement analytics",
		description:
			"Nous utilisons PostHog pour mesurer l'audience et améliorer l'expérience. Vous pouvez accepter ou refuser.",
		essentialTitle: "Essentiel",
		essentialDescription:
			"Stockage de votre choix de consentement dans le navigateur.",
		analyticsTitle: "Analytics",
		analyticsDescription:
			"PostHog (hébergement UE) pour comprendre les pages visitées et les parcours.",
		policyLink: "Voir la politique de confidentialité",
		showDetails: "Voir les détails",
		hideDetails: "Masquer les détails",
		close: "Fermer",
		deny: "Refuser",
		accept: "Accepter",
	},
	notFound: {
		label: "Erreur 404",
		title: "Cette page s'est égarée.",
		description: "La page que vous cherchez n'existe pas ou a été déplacée.",
		backHome: "Retour à l'accueil",
	},
	blog: {
		heroLabel: "Blog",
		heroTitle: "Réflexions pour livrer de grands produits mobiles.",
		description:
			"Notes de terrain sur la livraison mobile, les workflows Expo et le full-stack.",
		featured: "À la une",
		latest: "Derniers articles",
		empty: "Aucun article publié pour le moment.",
		back: "Retour au blog",
		other: "Autres articles",
		bookCtaButton: "Prendre rendez-vous",
		errorTitleList: "Erreur lors du chargement du blog",
		errorTitleDetail: "Erreur lors du chargement de l'article",
		errorFallback: "Une erreur inattendue s'est produite",
	},
	docs: {
		heroLabel: "Documents",
		heroTitle: "Documentation légale",
		heroDescription:
			"Retrouvez les documents obligatoires et informations légales.",
		effectiveDate: "Date d'effet",
		empty: "Aucun document disponible.",
		cardDescriptions: {
			legal: "Éditeur, hébergement et contacts.",
			privacy: "Collecte des données et vos droits.",
		},
	},
	cv: {
		header: {
			name: "Simon Boisset",
			title: "Développeur Full-Stack orienté Mobile",
			location: "Nantes, France",
			email: "simon@lezo.dev",
			website: "https://simonboisset.com",
			github: "https://github.com/simonboisset",
			linkedin: "https://linkedin.com/in/simon-boisset",
		},
		summary:
			"Bonjour, je suis Simon. Développeur autodidacte passionné par le web et le mobile, j'exerce professionnellement depuis 2020. J'ai mené plusieurs projets jusqu'en production. N'hésitez pas à me contacter si vous recherchez une expertise full-stack ou mobile, notamment en React Native.",
		sections: {
			experience: "Expérience",
			projects: "Projets sélectionnés",
			education: "Formation",
		},
		experience: {
			item1: {
				company: "CAMPING-CAR PARK",
				role: "Développeur React Native",
				period: "2024 - 2025",
				bullets: {
					item1:
						"Pilotage d'une refonte mobile et migration d'un React Native legacy vers Expo.",
					item2:
						"Amélioration de la structure projet et de la fiabilité des releases.",
				},
			},
			item2: {
				company: "VAERDICT",
				role: "Développeur Full-Stack",
				period: "2024",
				bullets: {
					item1:
						"Re-architecture d'une application web métier pour gagner en évolutivité.",
					item2:
						"Lead technique et accompagnement de l'équipe de développement interne.",
				},
			},
			item3: {
				company: "LiNote",
				role: "Développeur React Native",
				period: "2023",
				bullets: {
					item1:
						"Développement d'une application React Native from scratch alignée avec le web.",
					item2:
						"Livraison des fonctionnalités clés de communication sur iOS et Android.",
				},
			},
			item4: {
				company: "Silbo",
				role: "Développeur Full-Stack",
				period: "2020 - 2023",
				bullets: {
					item1:
						"Livraison d'applications web et terrain dans le secteur santé.",
					item2:
						"Focus sur la fiabilité, le temps réel et l'exploitation en production.",
				},
			},
		},
		projects: {
			item1: {
				name: "Mon Pont Chaban",
				context:
					"Application mobile d'alertes sur les horaires de levée du pont de Bordeaux.",
				stack: "React Native, Expo, Push Notifications, Trigger.dev",
				highlights: {
					item1:
						"Mise en place d'envois push notifications personnalisées selon les créneaux utilisateurs.",
					item2:
						"Automatisation des workflows de notification pour des envois fiables.",
				},
			},
			item2: {
				name: "Questovery",
				context:
					"Plateforme de jeux de piste géolocalisés avec application mobile participant.",
				stack: "React Native, Expo, Web, Géolocalisation",
				highlights: {
					item1:
						"Conception de parcours interactifs basés sur la géolocalisation.",
					item2:
						"Livraison de fonctionnalités produit pour créateurs et participants.",
				},
			},
		},
		education: {
			item1: {
				degree: "Développement professionnel dans le domaine du web",
				school: "Apprentissage autonome orienté projets",
				period: "Depuis 2015",
				details:
					"Parcours centré sur l'ingénierie web et produit, puis extension vers l'architecture mobile, l'ingénierie de release et le delivery full-stack.",
			},
			item2: {
				degree: "Master de physique des lasers",
				school: "Université Lille 1",
				period: "2014",
				details:
					"Base solide en optique, photonique, modélisation mathématique et rigueur scientifique.",
			},
		},
	},
	home: {
		hero: {
			eyebrow: "Freelance mobile + full-stack",
			title: "Des apps mobiles solides, prêtes pour la production.",
			intro:
				"Je suis Simon Boisset, développeur mobile/full-stack. J'aide les équipes à livrer des apps React Native/Expo, remettre à plat des stacks legacy et sécuriser les releases.",
			ctaPrimary: "Lancer un projet",
			ctaSecondary: "Voir les services",
			ctaGithub: "GitHub",
			highlights: {
				expertise: "Expertise React Native + Expo",
				delivery: "Livraison prête pour la production",
				performance: "Optimisation perf & release",
			},
		},
		availability: {
			label: "Disponibilités",
			status: "Réservation ouverte",
			badge: "Créneaux ouverts",
			items: {
				item1: "Discovery produit + roadmap",
				item2: "Delivery mobile de bout en bout",
				item3: "Automatisation des releases et support QA",
			},
		},
		signature: {
			label: "Signature",
			title: "Delivery Expo clair et fiable",
			description:
				"Un workflow Expo/EAS simple pour livrer régulièrement, sans surprise.",
		},
		projectsSection: {
			label: "Projets sélectionnés",
			title: "Exemples de réalisations",
			description:
				"Apps mobiles, web apps et outils professionnels livrés pour des équipes opérationnelles.",
			productLabel: "Produit / entreprise",
			impactLabel: "Impact / contributions",
		},
		projects: {
			campingCarPark: {
				name: "CAMPING-CAR PARK - Modernisation app mobile",
				product: {
					line1:
						"App mobile grand public pour réserver et gérer des séjours en camping-car.",
				},
				impact: {
					line1: "Refonte mobile + migration React Native legacy vers Expo.",
					line2:
						"Référent mobile pour structuration du projet et autonomisation équipe.",
				},
				stack: {
					item1: "React Native",
					item2: "Expo",
					item3: "Mobile",
					item4: "Architecture",
				},
			},
			vaerdict: {
				name: "VAERDICT - Re-architecture application web métier",
				product: {
					line1:
						"App web pour conseillers en gestion de patrimoine immobilier.",
				},
				impact: {
					line1: "Reprise du codebase et restructuration pour l'évolutivité.",
					line2: "Lead technique + formation pour renforcer l'équipe interne.",
				},
				stack: {
					item1: "Web",
					item2: "React",
					item3: "TypeScript",
					item4: "Architecture",
				},
			},
			linote: {
				name: 'LiNote - App mobile "lien social"',
				product: {
					line1: "App mobile pour garder le lien avec des proches âgés.",
				},
				impact: {
					line1: "Développement React Native from scratch aligné à l'app web.",
					line2:
						"Fonctionnalités clés : rappels, messagerie, partage photo, appels vidéo.",
				},
				stack: {
					item1: "React Native",
					item2: "Mobile",
					item3: "iOS",
					item4: "Android",
				},
			},
			silbo: {
				name: "Silbo - Santé : web + apps terrain",
				product: {
					line1:
						"Startup santé : web d'optimisation des flux patients + apps terrain.",
				},
				impact: {
					line1:
						"Cycle complet produit -> mise en production en collaboration produit.",
					line2: "Focus fiabilité, temps réel et ergonomie iOS/Android.",
				},
				stack: {
					item1: "Web",
					item2: "Mobile",
					item3: "Fiabilité",
					item4: "Temps réel",
				},
			},
			monPontChanban: {
				name: "Mon Pont Chanban - Alertes levées du pont de Bordeaux",
				product: {
					line1:
						"App mobile d'alertes push pour suivre les levées du pont de Bordeaux.",
				},
				impact: {
					line1:
						"Notifications personnalisées sur les créneaux horaires des utilisateurs.",
					line2: "Planification des notifications via Trigger.dev.",
				},
				stack: {
					item1: "React Native",
					item2: "Expo",
					item3: "Push",
					item4: "Trigger.dev",
				},
			},
			questovery: {
				name: "Questovery - Jeux de piste géolocalisés",
				product: {
					line1:
						"Plateforme pour créer des jeux de piste avec une app mobile participants.",
				},
				impact: {
					line1: "Expériences interactives basées sur la géolocalisation.",
					line2: "Parcours sur-mesure pour animation et tourisme.",
				},
				stack: {
					item1: "React Native",
					item2: "Mobile",
					item3: "Géolocalisation",
					item4: "Game design",
				},
			},
		},
		servicesSection: {
			label: "Services",
			title: "React + Expo, en mode pragmatique",
			description:
				"MVP, migration ou reprise d'existant : je pose une base saine pour continuer à shipper.",
		},
		serviceLines: {
			mobile: {
				title: "Delivery produit mobile",
				description:
					"Build React Native et Expo du MVP à la production, avec une architecture scalable.",
			},
			fullstack: {
				title: "Support full-stack",
				description:
					"Design d'API, modélisation des données et back offices pour compléter les apps mobiles.",
			},
			design: {
				title: "Collaboration design/dev",
				description:
					"UI soignées, animations, et kits cohérents pour aligner les équipes.",
			},
		},
		productized: {
			legacy: {
				title: "Migration React Native legacy vers Expo",
				description:
					"Passer d'un tooling legacy à une stack Expo moderne sans casser la roadmap.",
				bullets: {
					item1: "Audit + plan de migration",
					item2: "Stratégie de déploiement incrémentale",
					item3: "Pipeline Expo prêt pour la production",
				},
			},
			workflow: {
				title: "Optimisation du workflow Expo",
				description:
					"Accélérer les builds, fiabiliser les releases et rendre le CI/CD prévisible.",
				bullets: {
					item1: "Optimisation EAS build + submit",
					item2: "Audit environnement + secrets",
					item3: "Playbooks monitoring & release",
				},
			},
			keystone: {
				title: "Keystone Stack",
				description:
					"Le socle SaaS prêt pour le web, le mobile et l'API, avec une base solide.",
				bullets: {
					item1: "Auth, organisations et billing prêts",
					item2: "SDK partagé + design system",
					item3: "Qualité, CI/CD et analytics intégrés",
				},
			},
			button: "Voir le détail",
		},
		testimonialsSection: {
			label: "Témoignages",
			title: "Ce que les équipes retiennent",
			description: "Retours des personnes qui m'ont fait confiance.",
		},
		testimonials: {
			eric: {
				quote:
					"Simon est très agréable en matière de collaboration, il est expérimenté, il a su s'intégrer à l'équipe et faire immédiatement preuve d'implication. Il a également fait preuve d'une capacité d'adaptation et de synergie avec notre précieux développeur historique. Tout cela nous permet d'entrevoir sereinement la poursuite du développement de notre projet dans le temps.",
				name: "Eric",
				role: "CEO, Vaerdict",
			},
			anthony: {
				quote:
					"Très bonne expérience avec Simon. Communication facile, très pro, qualité du code top et livraison rapide. Nous lui avons confié une nouvelle mission suite à celle-ci.",
				name: "Anthony",
				role: "CEO, LiNote",
			},
			thomas: {
				quote:
					"J'ai eu l'opportunité de travailler avec Simon pendant plus de deux ans au sein de mon équipe. Simon est un VRAI développeur Full Stack par définition, il peut aussi bien améliorer des composants UI, améliorer le backend ou le mobile, comme faire de l'optimisation d'infrastructure cloud ou des pipelines de CI/CD. Force de proposition pour des architectures efficaces, il est aussi très compétent pour apprendre de nouveaux concepts complexes.",
				name: "Thomas",
				role: "CTO, Silbo",
			},
		},
		cta: {
			label: "Prêt à livrer",
			title: "Parlons de votre projet mobile.",
			description:
				"Donnez le contexte, je reviens sous 48h avec des prochaines étapes claires.",
			button: "Planifier un appel",
		},
	},
	products: {
		saasStarter: {
			seoTitle: "Keystone Stack (web, mobile, API)",
			seoDescription:
				"Un stack SaaS solide, prêt pour l'IA, pour le web, le mobile et l'API. Auth, orgs, billing prêt, analytics et SDK partagé.",
			hero: {
				eyebrow: "Keystone Stack",
				title: "A solid, AI-ready SaaS stack.",
				subtitle: "Build fast. Stay stable.",
				ctaPrimary: "Rejoindre la liste d’attente",
				ctaSecondary: "Voir la stack",
				badges: {
					auth: "Auth + orgs",
					sdk: "SDK partagé",
					design: "AI-ready",
				},
				highlights: {
					speed: {
						title: "Mise en prod rapide",
						description: "Tout est câblé pour livrer un MVP en jours.",
					},
					quality: {
						title: "Qualité & garde-fous",
						description: "TypeScript strict, Biome, règles anti-bypass.",
					},
					scale: {
						title: "Multi-plateforme cohérente",
						description: "SDK partagé, oRPC et TanStack Form.",
					},
				},
				preview: {
					title: "Ce que vous obtenez",
					tag: "De bout en bout",
				},
			},
			stack: {
				title: "L’essentiel, directement exploitable",
				subtitle: "Apps principales et types partagés prêts à livrer.",
				items: {
					web: {
						title: "App web",
						description: "Vite + TanStack Start + Tailwind + shadcn UI.",
					},
					api: {
						title: "Couche API",
						description: "Hono + oRPC + Zod + Better Auth.",
					},
					data: {
						title: "Base de données",
						description: "Drizzle ORM + Postgres + migrations.",
					},
					mobile: {
						title: "Mobile",
						description: "Expo + React Native + SDK partagé + workflows EAS.",
					},
				},
				badges: {
					item1: "TanStack Start",
					item2: "Expo",
					item3: "Hono + oRPC",
					item4: "Drizzle ORM",
					item5: "Postgres",
				},
			},
			included: {
				title: "Inclus par défaut",
				subtitle: "Des features produit prêtes à brancher.",
				items: {
					auth: {
						title: "Auth + 2FA",
						description: "Email, magic link, Turnstile et TOTP.",
					},
					orgs: {
						title: "Organisations & invitations",
						description: "Workspaces, rôles, invitations d’équipe.",
					},
					billing: {
						title: "Billing prêt",
						description: "Clients et abonnements prêts à activer.",
					},
					admin: {
						title: "Admin analytics",
						description: "KPI d’activation et d’adoption.",
					},
					sdk: {
						title: "SDK partagé",
						description: "oRPC client + TanStack Query/Form.",
					},
					content: {
						title: "CMS Directus",
						description: "Blog, docs et légaux localisés.",
					},
				},
			},
			designSystem: {
				title: "Design system partagé",
				subtitle: "Un seul système de tokens pour le web et le mobile.",
				items: {
					tokens: {
						title: "Tokens partagés",
						description: "Couleurs, radius, spacing et motion au même endroit.",
					},
					web: {
						title: "UI web",
						description: "shadcn UI branché sur les mêmes tokens.",
					},
					mobile: {
						title: "UI mobile",
						description: "Uniwind consomme le même système de tokens.",
					},
				},
			},
			quality: {
				title: "Ship vite, reprendre la main",
				subtitle:
					"Commence en vibe code, puis garde le contrôle avec un code propre et des règles claires.",
				items: {
					typing: {
						title: "MVP en quelques jours",
						description:
							"Lance un produit viable rapidement avec les flux clés déjà câblés.",
					},
					lint: {
						title: "Vibe code sans friction",
						description:
							"Avance vite au début sans perdre la structure ensuite.",
					},
					agents: {
						title: "Code + règles maîtrisés",
						description:
							"Conventions strictes, contrats partagés, règles faciles à imposer.",
					},
				},
			},
			showcase: {
				title: "Aperçu produit",
				subtitle: "Quelques écrans et flux clés (placeholders).",
				items: {
					item1: {
						title: "Dashboard organisation",
						description: "Vue des membres, billing et statut.",
					},
					item2: {
						title: "Onboarding 2FA",
						description: "Setup TOTP + codes de secours.",
					},
					item3: {
						title: "Admin analytics",
						description: "KPI d’activation et d’adoption.",
					},
					item4: {
						title: "Pipeline mobile",
						description: "Build, submit et updates via EAS.",
					},
				},
			},
			waitlist: {
				title: "Rejoindre la liste d’attente",
				subtitle: "Laissez votre email pour l’accès anticipé.",
				form: {
					emailLabel: "Email pro",
					emailPlaceholder: "vous@entreprise.com",
					profileLabel: "Profil",
					profilePlaceholder: "Choisissez votre profil",
					profileOptions: {
						pro: "Pro",
						hobby: "Hobby",
						agency: "Agence",
					},
					projectTypesLabel: "Type de projet",
					projectTypes: {
						side: "Projet perso",
						client: "Projet client",
					},
					painLabel: "Quel problème ce template doit résoudre ?",
					painPlaceholder:
						"Temps d’onboarding, auth, billing, base de code, etc.",
					budgetLabel: "Budget que vous pourriez payer pour ce template",
					budgetPlaceholder: "ex. 490",
					submit: "Rejoindre la liste d’attente",
				},
				successTitle: "Vous êtes sur la liste !",
				successDescription:
					"On vous contacte dès l’ouverture et pour les updates.",
				errors: {
					required: "Ce champ est requis.",
					email: "Entrez un email valide.",
					projectTypes: "Sélectionnez au moins un type de projet.",
					budget: "Indiquez un budget.",
					submit: "Une erreur est survenue. Réessayez.",
				},
			},
			faq: {
				title: "Questions fréquentes",
				subtitle: "Les réponses aux questions les plus courantes.",
				item1: {
					question: "Est-ce prêt pour la production ?",
					answer:
						"Oui. Le stack inclut déjà auth, analytics et CMS de bout en bout.",
				},
				item2: {
					question: "Puis-je utiliser mon propre CMS ou ma base ?",
					answer:
						"Bien sûr. Vous pouvez remplacer Directus ou Drizzle par vos outils.",
				},
				item3: {
					question: "La plateforme gère-t-elle plusieurs langues ?",
					answer:
						"Oui. Le routage, le dictionnaire et le contenu sont localisés.",
				},
				item4: {
					question: "Puis-je être accompagné au lancement ?",
					answer: "Oui. Le template peut être livré avec un onboarding guidé.",
				},
			},
		},
	},
	services: {
		common: {
			productizedLabel: "Service packagé",
			backHome: "Retour à l'accueil",
			outcomesLabel: "Résultats",
			focusAreasLabel: "Axes de travail",
			processLabel: "Process",
			deliverablesLabel: "Livrables",
			faqLabel: "FAQ",
		},
		legacy: {
			title: "Migration React Native legacy vers Expo",
			intro:
				"Programme d'accompagnement forfaitaire pour migrer une app React Native legacy vers Expo, moderniser la stack et assurer la conformité App Store / Play Store. Audit complet des dépendances natives, compatibilité Expo, et stratégie EAS (inclut l'optimisation du workflow Expo).",
			cta: "Planifier un accompagnement",
			highlights: {
				stackAlignment: {
					title: "Stack modernisée",
					description:
						"Mise à niveau React Native + Expo, audit des modules natifs et compatibilité durable.",
				},
				predictableReleases: {
					title: "Releases maîtrisées",
					description:
						"Stratégie EAS Build/Submit, OTA updates, versioning et gestion des hotfix.",
				},
				handoff: {
					title: "Conformité + autonomie",
					description:
						"Conformité stores, documentation et transfert de compétences à l'équipe.",
				},
			},
			outcomesTitle: "Ce que la migration débloque",
			outcomesDescription:
				"Une app à jour, conforme aux stores, avec un delivery Expo maîtrisé.",
			outcomes: {
				item1: "Stack React Native + Expo à jour et supportée",
				item2: "Dépendances natives compatibles Expo ou remplacées",
				item3: "Distribution QA rapide via OTA et canaux dédiés",
				item4: "Stratégie de release et hotfix claire, conforme aux stores",
			},
			deliverablesIntroTitle: "Ce qui est inclus dans le forfait",
			deliverablesIntroDescription:
				"Audit complet, migration guidée et workflows Expo opérationnels.",
			deliverables: {
				item1: "Audit React Native + cartographie des dépendances natives",
				item2:
					"Roadmap de migration avec mise à jour RN/Expo et conformité stores",
				item3: "Remplacement des modules incompatibles + options de repli",
				item4: "Workflows Expo (EAS Build/Submit/Update) + versioning",
				item5: "Playbook release/QA/hotfix + handoff équipe",
			},
			processTitle: "Une migration en trois étapes, cadrée",
			processDescription:
				"Une migration progressive pour continuer à livrer sans rupture.",
			phases: {
				discovery: {
					title: "Discovery + audit",
					description:
						"Revue du codebase, cartographie des dépendances et conformité stores.",
				},
				migration: {
					title: "Exécution de la migration",
					description:
						"Upgrades incrémentaux, compatibilité Expo et mise à niveau RN/SDK.",
				},
				launch: {
					title: "Lancement + handoff",
					description:
						"EAS Build/Submit/Update, stabilisation et documentation équipe.",
				},
			},
			faqTitle: "FAQ migration",
			faqDescription: "Les réponses essentielles avant de lancer la migration.",
			faq: {
				item1: {
					question: "Combien de temps dure la migration ?",
					answer:
						"Après l'audit, vous obtenez un planning par phases avec des jalons clairs. La durée dépend du périmètre et des dépendances natives.",
				},
				item2: {
					question: "Que faites-vous des dépendances natives non compatibles ?",
					answer:
						"Chaque module est audité, remplacé ou adapté avec une alternative Expo, avec des options de repli documentées.",
				},
				item3: {
					question: "Peut-on continuer à livrer pendant la migration ?",
					answer:
						"Oui. La migration est progressive pour préserver la cadence et limiter les risques.",
				},
				item4: {
					question: "L'optimisation du workflow Expo est-elle incluse ?",
					answer:
						"Oui. EAS Build/Submit/Update, versioning et distribution QA font partie du forfait.",
				},
			},
		},
		workflow: {
			title: "Optimisation du workflow Expo",
			intro:
				"Audit release + versioning pour transformer le delivery Expo en système rapide et maîtrisé. Objectif : livrer des builds QA en minutes via OTA et gouverner les builds natifs avec des règles de hotfix et de fingerprints.",
			cta: "Optimiser mon workflow Expo",
			highlights: {
				releaseVelocity: {
					title: "Tests en minutes",
					description:
						"OTA updates et canaux QA pour partager une version en moins de 5 minutes.",
				},
				confidence: {
					title: "Versioning maîtrisé",
					description:
						"Gestion claire des hotfix, des channels et des fingerprints.",
				},
				handoff: {
					title: "Déploiements fiables",
					description:
						"Builds natifs contrôlés et process de release stable pour l'équipe.",
				},
			},
			outcomesTitle: "Résultats attendus",
			outcomesDescription:
				"Des releases plus fluides du commit à la production.",
			outcomes: {
				item1: "OTA updates partagées à la QA en moins de 5 minutes",
				item2: "Versioning + release channels clairs pour les hotfix",
				item3: "Builds natifs maîtrisés par profils et fingerprints",
				item4: "Process QA → prod documenté et reproductible",
			},
			focusTitle: "Périmètre d'optimisation",
			focusDescription:
				"Les leviers qui accélèrent les tests et sécurisent la production.",
			focusAreas: {
				area1: {
					title: "Audit release + versioning",
					description:
						"Convention de version, tags, changelog et règles de release.",
				},
				area2: {
					title: "EAS Update et canaux QA",
					description:
						"OTA updates rapides, branches de tests et distribution interne.",
				},
				area3: {
					title: "Builds natifs + hotfix",
					description:
						"Profils EAS, fingerprints et contrôle fin des sorties hotfix.",
				},
			},
			processTitle: "Un déroulé court et efficace",
			processDescription:
				"Audit, mise en place, puis transmission pour rendre l'équipe autonome.",
			phases: {
				discovery: {
					title: "Audit + diagnostic",
					description:
						"Analyse des releases, versioning, OTA et distribution interne.",
				},
				migration: {
					title: "Mise en place",
					description:
						"Configuration EAS, canaux QA, règles de release et hotfix.",
				},
				launch: {
					title: "Handoff + mesure",
					description:
						"Playbook de release, documentation et indicateurs de suivi.",
				},
			},
			faqTitle: "FAQ workflow",
			faqDescription:
				"Les questions clés avant d'optimiser votre delivery Expo.",
			faq: {
				item1: {
					question: "En combien de temps la QA reçoit une version ?",
					answer:
						"OTA updates et channels QA livrent une build en quelques minutes après un commit.",
				},
				item2: {
					question: "Comment gérez-vous les hotfix ?",
					answer:
						"Règles de versioning, channels et fingerprints pour des hotfix isolés et prévisibles.",
				},
				item3: {
					question: "Faut-il remplacer notre CI existante ?",
					answer:
						"Non. On aligne EAS avec votre CI actuelle et on réduit les étapes manuelles.",
				},
				item4: {
					question: "Que livrez-vous à la fin ?",
					answer:
						"Audit, configurations à jour et playbook de release pour l'équipe.",
				},
			},
		},
	},
};
