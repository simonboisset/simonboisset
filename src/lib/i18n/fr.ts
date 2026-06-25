import type { Translations } from "./en";

export const fr: Translations = {
	locale: "fr",
	seo: {
		homeTitle: "Modernisation React Native avec Expo - Simon Boisset",
		homeDescription:
			"Freelance React Native et Expo : modernisation d'apps mobiles, livraisons fiables et expérience produit avec Questovery.",
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
		projects: "Projets",
		testimonials: "Témoignages",
		blog: "Blog",
		blogAll: "Voir tous les articles",
		bookCall: "Réserver un appel",
		aboutItems: {
			services: "Migration Expo, workflow EAS et accompagnement mobile.",
			projects: "Cas concrets de livraison mobile, web et produit.",
			testimonials: "Retours clients sur la livraison et la collaboration.",
			github: "Open source, prototypes et exemples de code.",
		},
	},
	footer: {
		description:
			"Freelance React Native et Expo, avec un terrain produit concret : Questovery.",
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
			eyebrow: "React Native, Expo et livraison mobile",
			title: "Je modernise les apps React Native avec Expo.",
			intro:
				"J'aide les équipes à sortir d'une stack mobile fragile, stabiliser leurs livraisons et reprendre la main sur Expo/EAS. Questovery, mon produit de jeux de piste géolocalisés, nourrit ce travail au quotidien.",
			ctaPrimary: "Parler d'une migration Expo",
			ctaSecondary: "Découvrir Questovery",
			highlights: {
				expertise: "Migration RN legacy",
				delivery: "Livraisons Expo/EAS",
				performance: "Terrain produit Questovery",
			},
		},
		availability: {
			label: "Focus actuel",
			status: "Mobile + produit",
			badge: "Périmètre clair",
			items: {
				item1: "Audit React Native legacy",
				item2: "Migration Expo/EAS jusqu'en production",
				item3: "Retours terrain via Questovery",
			},
		},
		signature: {
			label: "Terrain d'intervention",
			title: "Des apps mobiles plus simples à livrer",
			description:
				"Je transforme des workflows natifs fragiles en QA rapide, sorties stores prévisibles et autonomie pour l'équipe.",
		},
		projectsSection: {
			label: "Cas concrets",
			title: "Des projets proches de vos enjeux",
			description:
				"Des exemples de missions où il fallait reprendre une base existante, livrer en production ou rendre une équipe plus autonome.",
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
				name: "Mon Pont Chaban - Alertes levées du pont de Bordeaux",
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
						"Plateforme pour créer des jeux de piste avec une app mobile pour participants.",
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
			label: "Deux focus",
			title: "Ce que je peux faire pour votre app",
			description:
				"J'interviens surtout quand une app React Native doit passer sur des bases Expo solides, avec un circuit de livraison que l'équipe peut garder en main.",
		},
		focus: {
			migration: {
				title: "Migration React Native vers Expo",
				description:
					"Auditer, migrer et stabiliser une app existante pour que l'équipe livre avec Expo/EAS sans subir la complexité native.",
				bullets: {
					item1: "Audit des dépendances natives et roadmap de migration",
					item2: "Déploiement Expo/EAS incrémental sans bloquer la roadmap",
					item3: "Guide QA, sortie store et hotfix",
				},
				cta: "Voir l'offre migration",
			},
			questovery: {
				title: "Questovery",
				description:
					"Une plateforme de jeux de piste géolocalisés avec app mobile participant. C'est mon terrain d'expérimentation Expo en conditions réelles : cartes, offline, géolocalisation et UX terrain.",
				bullets: {
					item1: "App participant React Native + Expo",
					item2: "Géolocalisation, parcours et contraintes terrain",
					item3: "Expérience SaaS créateur connectée à l'app mobile",
				},
				cta: "Ouvrir Questovery",
			},
		},
		method: {
			label: "Méthode migration",
			title: "Comment je sécurise votre migration Expo",
			description:
				"On commence par réduire le risque de livraison, puis on avance par étapes jusqu'à un workflow Expo maintenable par l'équipe.",
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
				"Donnez le contexte, je reviens sous 48 h avec des prochaines étapes claires.",
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
