import type { Translations } from "./en";

export const fr: Translations = {
	locale: "fr",
	nav: {
		brand: "Simon Boisset",
		tagline: "Mobile + Full-stack",
		home: "Accueil",
		services: "Services",
		projects: "Projets",
		testimonials: "Témoignages",
		blog: "Blog",
		bookCall: "Réserver un appel",
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
		essentialDescription: "Stockage de votre choix de consentement dans le navigateur.",
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
		description:
			"La page que vous cherchez n'existe pas ou a été déplacée.",
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
		errorTitleList: "Erreur lors du chargement du blog",
		errorTitleDetail: "Erreur lors du chargement de l'article",
		errorFallback: "Une erreur inattendue s'est produite",
	},
	docs: {
		heroLabel: "Documents",
		heroTitle: "Documentation légale",
		heroDescription: "Retrouvez les documents obligatoires et informations légales.",
		effectiveDate: "Date d'effet",
		empty: "Aucun document disponible.",
		cardDescriptions: {
			legal: "Éditeur, hébergement et contacts.",
			privacy: "Collecte des données et vos droits.",
		},
	},
	home: {
		hero: {
			eyebrow: "Freelance mobile + full-stack",
			title:
				"Des expériences mobiles performantes avec React Native + Expo.",
			intro:
				"Je suis Simon Boisset, développeur full-stack orienté mobile. J'aide les équipes à livrer des apps soignées, moderniser des stacks React Native legacy et fiabiliser les workflows de delivery.",
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
			title: "Delivery Expo-first",
			description:
				"Des upgrades SDK aux workflows EAS, je mets en place un système de release fiable et prévisible.",
		},
		projectsSection: {
			label: "Projets sélectionnés",
			title: "Pensé pour les équipes qui vont vite",
			description:
				"Livraison mobile, dashboards opérationnels et outils internes pour garder la confiance à chaque release.",
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
					line1: "App web pour conseillers en gestion de patrimoine immobilier.",
				},
				impact: {
					line1: "Reprise du codebase et restructuration pour l'évolutivité.",
					line2:
						"Lead technique + formation pour renforcer l'équipe interne.",
				},
				stack: {
					item1: "Web",
					item2: "React",
					item3: "TypeScript",
					item4: "Architecture",
				},
			},
			linote: {
				name: "LiNote - App mobile \"lien social\"",
				product: {
					line1: "App mobile pour garder le lien avec des proches âgés.",
				},
				impact: {
					line1:
						"Développement React Native from scratch aligné à l'app web.",
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
					line2:
						"Focus fiabilité, temps réel et ergonomie iOS/Android.",
				},
				stack: {
					item1: "Web",
					item2: "Mobile",
					item3: "Fiabilité",
					item4: "Temps réel",
				},
			},
		},
		servicesSection: {
			label: "Services",
			title: "Expertise React + Expo pour des équipes modernes",
			description:
				"Du greenfield aux migrations legacy, je conçois des systèmes de delivery qui gardent votre roadmap mobile en mouvement.",
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
			button: "Voir le détail",
		},
		testimonialsSection: {
			label: "Témoignages",
			title: "Des équipes qui ont fait confiance au process",
			description:
				"Des partenariats construits sur la clarté, la vélocité et une expertise React Native solide.",
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
			title: "Construisons une roadmap mobile fiable.",
			description:
				"Partagez vos objectifs et je reviens sous 48h avec les prochaines étapes.",
			button: "Planifier un appel",
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
		},
		legacy: {
			title: "Migration React Native legacy vers Expo",
			intro:
				"Modernisez votre stack mobile sans casser la roadmap. Je guide les équipes vers une migration Expo sûre, avec des builds plus rapides et un process de release stable.",
			cta: "Planifier une migration",
			highlights: {
				stackAlignment: {
					title: "Alignement de stack",
					description:
						"Réaligner Expo, React Native et les modules natifs sur une base supportée.",
				},
				predictableReleases: {
					title: "Releases prévisibles",
					description:
						"Mettre en place des pipelines EAS, OTA updates et playbooks de release.",
				},
				handoff: {
					title: "Handoff opérationnel",
					description:
						"Workflows documentés et montée en compétence de l'équipe.",
				},
			},
			deliverablesIntroTitle: "Ce que vous recevez",
			deliverablesIntroDescription:
				"Une roadmap détaillée, un codebase modernisé et un process de release que vous maîtrisez.",
			deliverables: {
				item1: "Audit technique de la stack React Native existante",
				item2: "Roadmap de migration Expo avec analyse des risques",
				item3: "Plan d'upgrade module par module avec options de repli",
				item4: "Pipeline EAS build, submit et OTA update",
				item5: "Plan QA avec checklist de release",
			},
			processTitle: "Une migration progressive à faible risque",
			processDescription:
				"Chaque phase est cadrée pour continuer à livrer pendant la migration.",
			phases: {
				discovery: {
					title: "Discovery + audit",
					description:
						"Revue du codebase, cartographie des dépendances et analyse de faisabilité.",
				},
				migration: {
					title: "Exécution de la migration",
					description:
						"Upgrades incrémentaux, remplacement de modules et configuration Expo.",
				},
				launch: {
					title: "Lancement + handoff",
					description:
						"Stabilisation, release management et documentation pour l'équipe.",
				},
			},
		},
		workflow: {
			title: "Optimisation du workflow Expo",
			intro:
				"Accélérez les builds, rendez les releases plus sereines et les handoffs plus clairs. J'améliore vos pipelines Expo pour que l'équipe livre à chaque sprint.",
			cta: "Optimiser mon workflow",
			highlights: {
				releaseVelocity: {
					title: "Vélocité de release",
					description: "Builds plus courts et moins d'étapes manuelles.",
				},
				confidence: {
					title: "Confiance",
					description: "Garde-fous de déploiement clairs et rollback maîtrisé.",
				},
				handoff: {
					title: "Handoff d'équipe",
					description: "Documentation et playbooks pour chaque release.",
				},
			},
			outcomesTitle: "Des améliorations concrètes du workflow",
			outcomesDescription:
				"Identifier les points de friction, fluidifier les validations et garder des releases sereines.",
			outcomes: {
				item1: "Builds et submits plus rapides",
				item2: "CI/CD stable pour iOS + Android",
				item3: "Checklists et monitoring clairs",
				item4: "Audit de configuration et secrets",
			},
			focusTitle: "Du CI/CD à l'observabilité release",
			focusDescription:
				"Je cible les étapes qui créent des délais, des handoffs et des interruptions non planifiées.",
			focusAreas: {
				area1: {
					title: "Optimisation du pipeline EAS",
					description:
						"Optimiser les profils de build, le caching et la parallélisation.",
				},
				area2: {
					title: "Fiabilité du workflow",
					description:
						"Mettre à jour les SDKs, nettoyer les dépendances et réduire la flakiness.",
				},
				area3: {
					title: "Visibilité release",
					description:
						"Ajouter des release notes, du monitoring et des revues post-release.",
				},
			},
		},
	},
};
