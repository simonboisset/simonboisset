import type { InferTranslation } from "typed-locale";

export const en = {
	locale: "en",
	seo: {
		homeTitle: "React Native to Expo migration - Simon Boisset",
		homeDescription:
			"React Native and Expo consultant helping CTOs migrate legacy mobile apps, secure EAS releases, and hand off the workflow to their team.",
		blogTitle: "Blog",
		cvTitle: "Resume",
		cvDescription:
			"Resume of Simon Boisset, mobile-focused full-stack developer (React Native, Expo, React, TypeScript).",
	},
	nav: {
		brand: "Simon Boisset",
		tagline: "React Native -> Expo",
		home: "Home",
		about: "About",
		services: "Services",
		projects: "Testimonials",
		method: "Method",
		blog: "Blog",
		blogAll: "View all posts",
		bookCall: "Book a call",
		aboutItems: {
			services: "Risks covered during a React Native to Expo migration.",
			projects: "Anonymized notes on collaboration and handoff.",
			method: "Audit, migration, release, and team handoff.",
			github: "Open-source work, experiments, and code samples.",
		},
	},
	footer: {
		description:
			"React Native and Expo consultant for mobile teams migrating toward safer releases.",
		scheduleCall: "Schedule a call",
		blog: "Blog",
		docs: "Docs",
		manageConsent: "Manage consent",
		github: "GitHub",
	},
	consent: {
		title: "Analytics consent",
		description:
			"We use PostHog to measure audience and improve the experience. You can accept or decline.",
		essentialTitle: "Essential",
		essentialDescription: "Store your consent choice in the browser.",
		analyticsTitle: "Analytics",
		analyticsDescription:
			"PostHog (EU hosting) to understand visited pages and journeys.",
		policyLink: "View the privacy policy",
		showDetails: "Show details",
		hideDetails: "Hide details",
		close: "Close",
		deny: "Decline",
		accept: "Accept",
	},
	notFound: {
		label: "Error 404",
		title: "This page drifted away.",
		description: "The page you're looking for doesn't exist or has been moved.",
		backHome: "Back to Home",
	},
	blog: {
		heroLabel: "Blog",
		heroTitle: "Field notes on React Native and Expo.",
		description:
			"Practical notes on migrations, release workflows, mobile architecture, and the product decisions behind Questovery.",
		featured: "Featured",
		latest: "Latest articles",
		empty: "No blog posts published yet.",
		back: "Back to blog",
		other: "Other articles",
		bookCtaButton: "Book a call",
		errorTitleList: "Error loading blog",
		errorTitleDetail: "Error loading post",
		errorFallback: "An unexpected error occurred",
	},
	docs: {
		heroLabel: "Documents",
		heroTitle: "Legal documentation",
		heroDescription: "Find the required documents and legal information.",
		effectiveDate: "Effective date",
		empty: "No documents available.",
		cardDescriptions: {
			legal: "Publisher, hosting, and contact details.",
			privacy: "How data is collected and your rights.",
		},
	},
	cv: {
		header: {
			name: "Simon Boisset",
			title: "Mobile-focused Full-Stack Developer",
			location: "Nantes, France",
			email: "simon@lezo.dev",
			website: "https://simonboisset.com",
			github: "https://github.com/simonboisset",
			linkedin: "https://linkedin.com/in/simon-boisset",
		},
		summary:
			"Hello, I'm Simon. I'm a self-taught developer passionate about web and mobile development, and I have been working professionally since 2020. I have delivered several projects to production. Feel free to contact me if you need full-stack or mobile expertise, especially in React Native.",
		sections: {
			experience: "Experience",
			projects: "Projects",
			education: "Education",
		},
		experience: {
			item1: {
				company: "CAMPING-CAR PARK",
				role: "React Native Developer",
				period: "2024 - 2025",
				bullets: {
					item1:
						"Led a mobile redesign and migration from legacy React Native to Expo.",
					item2:
						"Improved project structure and release confidence for the product team.",
				},
			},
			item2: {
				company: "VAERDICT",
				role: "Full-Stack Developer",
				period: "2024",
				bullets: {
					item1:
						"Re-architected a business web app for scalability and maintainability.",
					item2:
						"Provided technical leadership and onboarding for internal developers.",
				},
			},
			item3: {
				company: "LiNote",
				role: "React Native Developer",
				period: "2023",
				bullets: {
					item1:
						"Built a React Native app from scratch aligned with the web platform.",
					item2:
						"Delivered core communication features across iOS and Android.",
				},
			},
			item4: {
				company: "Silbo",
				role: "Full-Stack Developer",
				period: "2020 - 2023",
				bullets: {
					item1:
						"Shipped healthcare web and field applications with product stakeholders.",
					item2:
						"Focused on reliability, real-time behavior, and production operations.",
				},
			},
		},
		projects: {
			item1: {
				name: "Mon Pont Chaban",
				context: "Mobile alert app for Bordeaux bridge lift schedules.",
				stack: "React Native, Expo, Push Notifications, Trigger.dev",
				highlights: {
					item1:
						"Implemented personalized push notifications scheduling by user time slots.",
					item2: "Built automation workflows for reliable delivery timing.",
				},
			},
			item2: {
				name: "Questovery",
				context:
					"Geolocated treasure hunt platform with participant mobile app.",
				stack: "React Native, Expo, Web, Geolocation",
				highlights: {
					item1: "Developed interactive geolocation-based user journeys.",
					item2: "Delivered product features for creators and participants.",
				},
			},
		},
		education: {
			item1: {
				degree: "Professional Development in Web Technologies",
				school: "Independent and project-driven learning",
				period: "Since 2015",
				details:
					"Focused on web and product engineering, then expanded into mobile architecture, devops, and full-stack delivery.",
			},
			item2: {
				degree: "Master's Degree in Laser Physics",
				school: "Université Lille 1",
				period: "2014",
				details:
					"Foundation in optics, photonics, mathematical modeling, and scientific rigor.",
			},
		},
	},
	home: {
		hero: {
			eyebrow: "For React Native CTOs and lead techs",
			title: "React Native to Expo migration.",
			intro:
				"I help your team migrate to Expo/EAS without blocking releases or losing ownership.",
			ctaPrimary: "Discuss an Expo migration",
			ctaSecondary: "Read client notes",
			highlights: {
				expertise: "Native dependency audit",
				delivery: "EAS/store releases",
				performance: "Team handoff",
			},
		},
		testimonialsSection: {
			label: "They trusted me",
			title: "Mission feedback",
			description:
				"Concrete notes from React Native, Expo, and legacy mobile missions.",
		},
		testimonials: {
			eric: {
				name: "Eric",
				quote:
					"We started from a fairly complex legacy codebase. Simon took over the project, brought structure back to the whole stack, and still supports us day to day.",
			},
			julie: {
				name: "Julie",
				quote:
					"Simon built our React Native app from scratch while keeping it aligned with the existing web app. In a few weeks, we had reminders, messaging, photo sharing, and video calls.",
			},
			matthieu: {
				name: "Matthieu",
				quote:
					"We had been dragging this Expo migration for more than a year. Simon reassured us, delivered it in two weeks, and we were able to publish a clean version afterwards.",
			},
			thomas: {
				name: "Thomas",
				quote:
					"Simon joined a project where frontend, backend, mobile, and infrastructure were all tied together. He quickly understood how everything fit together, which saved us a lot of back and forth.",
			},
			julien: {
				name: "Romuald",
				quote:
					"Simon migrated three of our React Native apps to Expo after more than 9 years of maintenance. The migration went smoothly, and we are already seeing the benefits: much faster upgrades and finally reliable builds.",
			},
			antoine: {
				name: "Antoine",
				quote:
					"Our mobile codebase had become too complex: too many special cases, too many dependencies, and not much certainty left. Simon helped us regain control and put a clear structure back in place.",
			},
		},
		servicesSection: {
			label: "Expo scope",
			title: "A complete Expo engagement.",
			description:
				"Most migrations get stuck in the same places: native compatibility and EAS/store deployments. I handle both in the same diagnosis.",
		},
		risks: {
			native: {
				title: "Native surface",
				description:
					"Dependencies, permissions, config plugins, prebuild, and modules that can block Expo.",
				bullet:
					"You get a compatibility map and clear replacement or fallback options.",
			},
			delivery: {
				title: "EAS and QA deployments",
				description:
					"EAS Build, Submit, Update, channels, CI, and QA distribution.",
				bullet:
					"I advise the team on the options that actually fit the project to optimize deployment phases.",
			},
			stores: {
				title: "Tailored guidance",
				description:
					"Tradeoffs matched to your stack, store constraints, and product cadence.",
				bullet:
					"We choose the useful Expo options for the project instead of applying a generic workflow.",
			},
			handoff: {
				title: "Team ownership",
				description:
					"Decisions, playbooks, and tradeoffs are written for the internal team.",
				bullet:
					"The migration ends with a workflow your team can operate without me.",
			},
		},
		offerTracks: {
			migration: {
				label: "Track 01",
				title: "Legacy React Native -> Expo",
				description:
					"Audit the native surface, upgrade React Native and Expo, then replace or isolate the modules that can block the migration.",
				bullets: {
					item1: "Native dependency map and replacement plan",
					item2: "RN/Expo upgrade path with store constraints",
					item3: "Release-safe migration roadmap for the team",
				},
			},
			workflow: {
				label: "Track 02",
				title: "EAS workflow and releases",
				description:
					"Turn Expo deployments into a controlled path: QA updates, native builds, versioning, hotfixes, and handoff.",
				bullets: {
					item1: "EAS Build, Submit, Update, and QA channels",
					item2: "Versioning, fingerprints, and rollback rules",
					item3: "Documented QA to production playbook",
				},
			},
		},
		method: {
			label: "Migration method",
			title: "From your current app to an Expo release",
			description:
				"You keep the product moving. We remove the Expo blockers, prove the release path, then hand the workflow back to your team.",
			start: {
				label: "Start",
				title: "Your React Native app today",
				description:
					"Versions, native modules, CI, store setup, and the release issues already slowing the team down.",
			},
			audit: {
				eyebrow: "Map",
				title: "Find what blocks Expo",
				description:
					"We review the native modules, app config, CI, and store constraints before changing the code.",
				outcome: "Risk map and treatment order",
			},
			migration: {
				eyebrow: "Fix",
				title: "Replace what gets in the way",
				description:
					"We keep the product stable while adapting config, builds, and incompatible libraries.",
				outcome: "Expo app that can build cleanly",
			},
			release: {
				eyebrow: "Prove",
				title: "Run a real release path",
				description:
					"We validate EAS, QA channels, versions, and store rules on a release your team can inspect.",
				outcome: "QA to store path ready",
			},
			handoff: {
				eyebrow: "Transfer",
				title: "Give the team control",
				description:
					"We document the commands, decisions, and rollback options used during the migration.",
				outcome: "Team ready for the next releases",
			},
			end: {
				label: "Finish",
				title: "An Expo workflow the team can operate",
				description:
					"Builds, QA, store releases, and fallback paths are clear enough to run without me.",
			},
			status: {
				pending: "Pending",
				current: "In progress",
				done: "Validated",
			},
		},
		cta: {
			label: "Migration diagnosis",
			title: "Let's talk about your Expo migration.",
			description:
				"Send me your RN/Expo versions, native dependencies, and blockers. I will reply with the next steps.",
			button: "Schedule a call",
		},
	},
} as const;

export type Translations = InferTranslation<typeof en>;
