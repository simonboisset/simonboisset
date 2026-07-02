import type { Translations } from "./en";

export const fr: Translations = {
	locale: "fr",
	seo: {
		homeTitle: "Migration React Native vers Expo - Simon Boisset",
		homeDescription:
			"Consultant React Native et Expo pour CTO et lead tech : migration d'apps legacy, livraisons EAS fiables et passation à l'équipe.",
		blogTitle: "Blog",
		cvTitle: "CV",
		cvDescription:
			"CV de Simon Boisset, développeur full-stack orienté mobile (React Native, Expo, React, TypeScript).",
	},
	nav: {
		brand: "Simon Boisset",
		tagline: "React Native -> Expo",
		home: "Accueil",
		about: "À propos",
		services: "Services",
		projects: "Témoignages",
		method: "Méthode",
		blog: "Blog",
		blogAll: "Voir tous les articles",
		bookCall: "Réserver un appel",
		aboutItems: {
			services:
				"Risques couverts pendant une migration React Native vers Expo.",
			projects: "Retours anonymisés sur la collaboration et la passation.",
			method: "Audit, migration, release et passation équipe.",
			github: "Open source, prototypes et exemples de code.",
		},
	},
	footer: {
		description:
			"Consultant React Native et Expo pour équipes mobiles qui veulent livrer plus sereinement.",
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
		heroTitle: "Notes de terrain React Native et Expo.",
		description:
			"Retours pratiques sur les migrations, les circuits de livraison, l'architecture mobile et les choix produit derrière Questovery.",
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
			projects: "Projets",
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
					"Parcours centré sur l'ingénierie web et produit, puis extension vers l'architecture mobile, devops et full-stack.",
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
			eyebrow: "Pour CTO et lead tech React Native",
			title: "Migration React Native vers Expo.",
			intro:
				"J'aide votre équipe à migrer vers Expo/EAS sans bloquer les releases ni perdre la main.",
			ctaPrimary: "Parler d'une migration Expo",
			ctaSecondary: "Lire les retours clients",
			highlights: {
				expertise: "Audit dépendances natives",
				delivery: "Releases EAS/stores",
				performance: "Passation équipe",
			},
		},
		availability: {
			label: "Diagnostic migration",
			status: "Risque release d'abord",
			badge: "Avant le code",
			items: {
				item1: "Modules natifs et config plugins",
				item2: "EAS, CI, stores et chemins OTA",
				item3: "Stratégie hotfix et rollback",
			},
		},
		signature: {
			label: "Mode d'intervention",
			title: "Audit, roadmap, migration",
			description:
				"L'objectif n'est pas de tout déplacer d'un coup : on identifie la surface native risquée, on protège la roadmap produit et on rend les releases prévisibles.",
		},
		testimonialsSection: {
			label: "Ils m'ont fait confiance",
			title: "Retours de mission",
			description:
				"Quelques retours concrets de missions React Native, Expo et mobile legacy.",
		},
		testimonials: {
			eric: {
				name: "Eric",
				quote:
					"On partait d'un legacy assez complexe. Simon a repris le projet, remis de l'ordre dans toute la stack et continue de nous accompagner au quotidien.",
			},
			julie: {
				name: "Julie",
				quote:
					"Simon a construit notre app React Native depuis zéro, en restant aligné avec l'app web. En quelques semaines, on avait les rappels, les messages, le partage de photos et les appels vidéo.",
			},
			matthieu: {
				name: "Matthieu",
				quote:
					"On traînait cette migration Expo depuis plus d'un an. Simon nous a rassurés, l'a livrée en deux semaines, et on a pu publier une version propre derrière.",
			},
			thomas: {
				name: "Thomas",
				quote:
					"Simon est arrivé sur un projet où le front, le backend, le mobile et l'infra étaient tous liés. Il a vite compris comment tout s'emboîtait, ce qui nous a évité beaucoup d'allers-retours.",
			},
			julien: {
				name: "Romuald",
				quote:
					"Simon a migré vers Expo trois de nos apps React Native maintenues depuis plus de 9 ans. La migration s'est faite en douceur, et on en mesure déjà les bénéfices : montées de version bien plus rapides, builds enfin fiables.",
			},
			antoine: {
				name: "Antoine",
				quote:
					"Notre codebase mobile était devenue trop complexe : trop de cas particuliers, trop de dépendances, plus beaucoup de certitudes. Simon nous a aidés à reprendre la maîtrise et à remettre une structure claire.",
			},
		},
		servicesSection: {
			label: "Risques couverts",
			title: "Ce qui bloque une migration Expo",
			description:
				"Dépendances natives, CI, stores, OTA : on clarifie les risques avant de migrer.",
			cta: "Voir le périmètre migration",
		},
		risks: {
			native: {
				title: "Surface native",
				description:
					"Dépendances, permissions, config plugins, prebuild et modules qui peuvent bloquer Expo.",
				bullet:
					"Vous obtenez une carte de compatibilité et des options claires de remplacement ou de repli.",
			},
			delivery: {
				title: "Workflow de livraison",
				description:
					"EAS Build, Submit, Update, channels, CI et distribution QA.",
				bullet:
					"L'équipe sait quels changements demandent un build natif et lesquels peuvent partir en OTA.",
			},
			stores: {
				title: "Stores et hotfix",
				description:
					"Versioning, fingerprints, règles de rollback et contraintes App Store / Play Store.",
				bullet:
					"Les chemins de hotfix sont documentés avant le prochain incident de production.",
			},
			handoff: {
				title: "Autonomie équipe",
				description:
					"Décisions, playbooks et arbitrages sont écrits pour l'équipe interne.",
				bullet:
					"La migration se termine avec un workflow que votre équipe peut opérer sans moi.",
			},
		},
		method: {
			label: "Méthode migration",
			title: "Comment se passe la migration",
			description:
				"Audit, migration progressive, releases EAS, puis passation à l'équipe.",
			audit: {
				title: "Auditer la surface native",
				description:
					"Cartographier dépendances, app config, CI, contraintes stores, frictions de livraison et compatibilité Expo avant de toucher à la roadmap.",
			},
			migration: {
				title: "Migrer par incréments",
				description:
					"Mettre à jour React Native et Expo par étapes, remplacer les modules incompatibles et garder la branche produit livrable.",
			},
			release: {
				title: "Stabiliser les livraisons",
				description:
					"Configurer EAS Build, Submit, Update, channels, fingerprints et règles de distribution QA adaptées à l'équipe.",
			},
			handoff: {
				title: "Transférer la main",
				description:
					"Documenter décisions, playbooks et options de repli pour que l'équipe interne puisse continuer sans consultant en permanence.",
			},
		},
		cta: {
			label: "Diagnostic migration",
			title: "Parlons de votre migration Expo.",
			description:
				"Envoyez-moi vos versions RN/Expo, dépendances natives et points bloquants. Je vous réponds avec les prochaines étapes.",
			button: "Planifier un appel",
		},
	},
	services: {
		common: {
			productizedLabel: "Service packagé",
			backHome: "Retour à l'accueil",
			outcomesLabel: "Résultats",
			focusAreasLabel: "Axes de travail",
			processLabel: "Processus",
			deliverablesLabel: "Livrables",
			faqLabel: "FAQ",
		},
		legacy: {
			title: "Migration React Native vers Expo",
			intro:
				"Accompagnement forfaitaire pour migrer une app React Native vers Expo, moderniser la stack et sécuriser les sorties stores. Le forfait couvre l'audit natif, la compatibilité Expo et la stratégie EAS.",
			cta: "Planifier un accompagnement",
			highlights: {
				stackAlignment: {
					title: "Stack modernisée",
					description:
						"Mise à niveau React Native + Expo, audit des modules natifs et compatibilité durable.",
				},
				predictableReleases: {
					title: "Livraisons maîtrisées",
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
				"Une app à jour, conforme aux stores, avec un circuit Expo que l'équipe maîtrise.",
			outcomes: {
				item1: "Stack React Native + Expo à jour et supportée",
				item2: "Dépendances natives compatibles Expo ou remplacées",
				item3: "Distribution QA rapide via OTA et canaux dédiés",
				item4: "Stratégie de sortie et hotfix claire, conforme aux stores",
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
				item5: "Guide QA, sortie store, hotfix et prise en main équipe",
			},
			processTitle: "Une migration en trois étapes, cadrée",
			processDescription:
				"Une migration progressive pour continuer à livrer sans rupture.",
			phases: {
				discovery: {
					title: "Cadrage + audit",
					description:
						"Revue du codebase, cartographie des dépendances et conformité stores.",
				},
				migration: {
					title: "Exécution de la migration",
					description:
						"Mises à jour incrémentales, compatibilité Expo et mise à niveau RN/SDK.",
				},
				launch: {
					title: "Lancement + prise en main",
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
				"Audit livraison + versioning pour transformer votre circuit Expo en système rapide et maîtrisé. Objectif : livrer des builds QA en minutes via OTA et gouverner les builds natifs avec des règles de hotfix et de fingerprints.",
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
						"Builds natifs contrôlés et processus de livraison stable pour l'équipe.",
				},
			},
			outcomesTitle: "Résultats attendus",
			outcomesDescription:
				"Des livraisons plus fluides du commit à la production.",
			outcomes: {
				item1: "OTA updates partagées à la QA en moins de 5 minutes",
				item2: "Versioning + canaux de release clairs pour les hotfix",
				item3: "Builds natifs maîtrisés par profils et fingerprints",
				item4: "Process QA → prod documenté et reproductible",
			},
			focusTitle: "Périmètre d'optimisation",
			focusDescription:
				"Les leviers qui accélèrent les tests et sécurisent la production.",
			focusAreas: {
				area1: {
					title: "Audit livraison + versioning",
					description:
						"Convention de version, tags, changelog et règles de livraison.",
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
						"Analyse des livraisons, versioning, OTA et distribution interne.",
				},
				migration: {
					title: "Mise en place",
					description:
						"Configuration EAS, canaux QA, règles de livraison et hotfix.",
				},
				launch: {
					title: "Transmission + mesure",
					description:
						"Guide de livraison, documentation et indicateurs de suivi.",
				},
			},
			faqTitle: "FAQ workflow",
			faqDescription:
				"Les questions clés avant d'optimiser votre circuit Expo.",
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
						"Audit, configurations à jour et guide de livraison pour l'équipe.",
				},
			},
		},
	},
};
