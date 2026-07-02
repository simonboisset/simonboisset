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
			label: "Périmètre Expo",
			title: "Un accompagnement Expo complet.",
			description:
				"La plupart des migrations bloquent aux mêmes endroits : compatibilité native et déploiements EAS/stores. Je traite les deux dans le même diagnostic.",
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
				title: "Déploiements EAS et QA",
				description:
					"EAS Build, Submit, Update, channels, CI et distribution QA.",
				bullet:
					"Je conseille l'équipe sur les options applicables au projet pour optimiser les phases de déploiement.",
			},
			stores: {
				title: "Accompagnement sur mesure",
				description:
					"Arbitrages selon votre stack, vos contraintes stores et votre cadence produit.",
				bullet:
					"On choisit les options utiles au projet, sans appliquer un workflow Expo générique.",
			},
			handoff: {
				title: "Autonomie équipe",
				description:
					"Décisions, playbooks et arbitrages sont écrits pour l'équipe interne.",
				bullet:
					"La migration se termine avec un workflow que votre équipe peut opérer sans moi.",
			},
		},
		offerTracks: {
			migration: {
				label: "Chantier 01",
				title: "React Native legacy vers Expo",
				description:
					"Auditer la surface native, mettre à niveau React Native et Expo, puis remplacer ou isoler les modules qui peuvent bloquer la migration.",
				bullets: {
					item1: "Cartographie des dépendances natives et plan de remplacement",
					item2: "Chemin RN/Expo avec contraintes stores intégrées",
					item3: "Roadmap de migration livrable pour l'équipe",
				},
			},
			workflow: {
				label: "Chantier 02",
				title: "Workflow EAS et releases",
				description:
					"Transformer vos déploiements Expo en chemin maîtrisé : QA, builds natifs, versioning, hotfix et passation.",
				bullets: {
					item1: "EAS Build, Submit, Update et canaux QA",
					item2: "Versioning, fingerprints et règles de rollback",
					item3: "Guide QA vers production documenté",
				},
			},
		},
		method: {
			label: "Méthode migration",
			title: "De votre app actuelle à une release Expo",
			description:
				"Votre produit continue d'avancer. On retire les blocages Expo, on prouve le chemin de release, puis l'équipe reprend la main.",
			start: {
				label: "Départ",
				title: "Votre app React Native aujourd'hui",
				description:
					"Versions, modules natifs, CI, stores et points de release qui ralentissent déjà l'équipe.",
			},
			audit: {
				eyebrow: "Cartographier",
				title: "Repérer ce qui bloque Expo",
				description:
					"On vérifie les modules natifs, la config app, la CI et les contraintes stores avant de toucher au code.",
				outcome: "Carte des risques et ordre de traitement",
			},
			migration: {
				eyebrow: "Débloquer",
				title: "Remplacer ce qui coince",
				description:
					"On garde le produit stable pendant l'adaptation de la config, des builds et des librairies incompatibles.",
				outcome: "App Expo qui build proprement",
			},
			release: {
				eyebrow: "Prouver",
				title: "Tester une vraie sortie",
				description:
					"On valide EAS, les canaux QA, les versions et les règles store sur une release que l'équipe peut inspecter.",
				outcome: "Chemin QA vers store prêt",
			},
			handoff: {
				eyebrow: "Transmettre",
				title: "Passer la main à l'équipe",
				description:
					"On documente les commandes, les choix et les options de rollback utilisés pendant la migration.",
				outcome: "Équipe prête pour les prochaines releases",
			},
			end: {
				label: "Arrivée",
				title: "Un workflow Expo que l'équipe peut opérer",
				description:
					"Builds, QA, stores et options de repli sont assez clairs pour continuer sans moi.",
			},
			status: {
				pending: "En attente",
				current: "En cours",
				done: "Validé",
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
};
