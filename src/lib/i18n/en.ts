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
		availability: {
			label: "Migration diagnosis",
			status: "Release risk first",
			badge: "Before code",
			items: {
				item1: "Native modules and config plugins",
				item2: "EAS, CI, stores, and OTA paths",
				item3: "Hotfix and rollback strategy",
			},
		},
		signature: {
			label: "How I step in",
			title: "Audit, roadmap, migration",
			description:
				"The goal is not to move everything at once: we identify the risky native surface, preserve the product roadmap, and make releases predictable.",
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
			label: "Risks covered",
			title: "What blocks an Expo migration",
			description:
				"Native dependencies, CI, stores, OTA: we clarify the risks before migrating.",
			cta: "See the migration scope",
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
				title: "Delivery workflow",
				description:
					"EAS Build, Submit, Update, channels, CI, and QA distribution.",
				bullet:
					"The team knows which changes need native builds and which can ship through OTA.",
			},
			stores: {
				title: "Store and hotfix risk",
				description:
					"Versioning, fingerprints, rollback rules, and app-store constraints.",
				bullet:
					"Hotfix paths are documented before the next production incident.",
			},
			handoff: {
				title: "Team ownership",
				description:
					"Decisions, playbooks, and tradeoffs are written for the internal team.",
				bullet:
					"The migration ends with a workflow your team can operate without me.",
			},
		},
		method: {
			label: "Migration method",
			title: "How the migration works",
			description:
				"Audit, progressive migration, EAS releases, then handoff to the team.",
			audit: {
				title: "Audit the native surface",
				description:
					"Map dependencies, app config, CI, store constraints, release pain, and Expo compatibility before touching the roadmap.",
			},
			migration: {
				title: "Migrate incrementally",
				description:
					"Upgrade React Native and Expo in controlled steps, replace incompatible modules, and keep the product branch shippable.",
			},
			release: {
				title: "Stabilize releases",
				description:
					"Set EAS Build, Submit, Update, channels, fingerprints, and QA distribution rules that match how the team ships.",
			},
			handoff: {
				title: "Transfer ownership",
				description:
					"Document decisions, playbooks, and fallback paths so the internal team can keep releasing without a consultant in the loop.",
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
	services: {
		common: {
			productizedLabel: "Productized service",
			backHome: "Back to home",
			outcomesLabel: "Outcomes",
			focusAreasLabel: "Focus areas",
			processLabel: "Process",
			deliverablesLabel: "Deliverables",
			faqLabel: "FAQ",
		},
		legacy: {
			title: "React Native to Expo migration",
			intro:
				"A fixed-fee engagement to migrate a React Native app to Expo, modernize the stack, and secure store releases. The scope covers the native audit, Expo compatibility, and the EAS delivery strategy.",
			cta: "Plan a migration",
			highlights: {
				stackAlignment: {
					title: "Modernized stack",
					description:
						"Upgrade React Native + Expo and audit native modules for long-term compatibility.",
				},
				predictableReleases: {
					title: "Release control",
					description:
						"EAS Build/Submit, OTA updates, versioning, and hotfix handling.",
				},
				handoff: {
					title: "Store-ready handoff",
					description: "Store compliance, documentation, and team enablement.",
				},
			},
			outcomesTitle: "What the migration unlocks",
			outcomesDescription:
				"An up-to-date, store-compliant app with an Expo delivery system the team controls.",
			outcomes: {
				item1: "Latest React Native + Expo baseline with support",
				item2: "Native dependencies compatible with Expo or replaced",
				item3: "Fast QA distribution via OTA and dedicated channels",
				item4: "Clear release + hotfix strategy aligned with store rules",
			},
			deliverablesIntroTitle: "What's included in the fixed-fee scope",
			deliverablesIntroDescription:
				"Full audit, guided migration, and production-ready Expo workflows.",
			deliverables: {
				item1: "React Native audit + native dependency mapping",
				item2: "Migration roadmap with RN/Expo upgrades and store compliance",
				item3: "Replacement plan for incompatible modules + fallback options",
				item4: "Expo workflows (EAS Build/Submit/Update) + versioning",
				item5: "Release/QA/hotfix playbook + team handoff",
			},
			processTitle: "A controlled, three-stage migration",
			processDescription:
				"A progressive rollout that keeps your team shipping.",
			phases: {
				discovery: {
					title: "Discovery + audit",
					description:
						"Codebase review, dependency mapping, and store compliance check.",
				},
				migration: {
					title: "Migration execution",
					description:
						"Incremental upgrades, module replacements, and Expo configuration.",
				},
				launch: {
					title: "Launch + handoff",
					description:
						"EAS Build/Submit/Update, stabilization, and team documentation.",
				},
			},
			faqTitle: "Migration FAQ",
			faqDescription: "Clear answers before you commit to the migration.",
			faq: {
				item1: {
					question: "How long does the migration take?",
					answer:
						"After the audit, you get a phased plan with clear milestones. Timelines depend on app complexity and native surface area.",
				},
				item2: {
					question: "What if a native dependency isn’t Expo-ready?",
					answer:
						"Each module is audited, replaced or adapted with Expo-compatible alternatives, and backed by documented fallback paths.",
				},
				item3: {
					question: "Can the team keep shipping during the migration?",
					answer:
						"Yes. The migration is staged to protect release cadence and reduce risk.",
				},
				item4: {
					question: "Is Expo workflow optimization included?",
					answer:
						"Yes. EAS Build/Submit/Update, versioning, and QA distribution are part of the fixed-fee scope.",
				},
			},
		},
		workflow: {
			title: "Expo workflow optimisation",
			intro:
				"A release and versioning audit that turns Expo delivery into a fast, controlled system. Share QA builds in minutes via OTA and govern native builds with hotfix and fingerprint precision.",
			cta: "Optimize my Expo workflow",
			highlights: {
				releaseVelocity: {
					title: "QA in minutes",
					description:
						"OTA updates and QA channels to ship in under 5 minutes.",
				},
				confidence: {
					title: "Versioning clarity",
					description: "Clean hotfix flows, channels, and fingerprints.",
				},
				handoff: {
					title: "Reliable releases",
					description: "Controlled native builds and a stable release process.",
				},
			},
			outcomesTitle: "Expected outcomes",
			outcomesDescription:
				"Faster releases from commit to production, with fewer surprises.",
			outcomes: {
				item1: "OTA updates shared to QA in under 5 minutes",
				item2: "Versioning + release channels for hotfix control",
				item3: "Native builds managed by profiles and fingerprints",
				item4: "Documented QA → production release path",
			},
			focusTitle: "The optimization scope",
			focusDescription:
				"The levers that accelerate testing and secure production.",
			focusAreas: {
				area1: {
					title: "Release audit + versioning",
					description:
						"Versioning rules, tags, changelog, and release conventions.",
				},
				area2: {
					title: "EAS Update + QA channels",
					description:
						"Fast OTA updates, QA branches, and internal distribution.",
				},
				area3: {
					title: "Native builds + hotfix",
					description:
						"EAS profiles, fingerprints, and fine-grained hotfix control.",
				},
			},
			processTitle: "A short, effective engagement",
			processDescription:
				"Audit, implementation, then handoff so the team stays autonomous.",
			phases: {
				discovery: {
					title: "Audit + diagnosis",
					description:
						"Review releases, versioning, OTA strategy, and internal distribution.",
				},
				migration: {
					title: "Implementation",
					description:
						"EAS configuration, QA channels, and hotfix rules in place.",
				},
				launch: {
					title: "Handoff + metrics",
					description: "Release playbook, documentation, and tracking metrics.",
				},
			},
			faqTitle: "Workflow FAQ",
			faqDescription:
				"Questions teams ask before optimizing their release workflow.",
			faq: {
				item1: {
					question: "How fast can QA get builds?",
					answer:
						"OTA updates and release channels deliver test builds in minutes after a commit.",
				},
				item2: {
					question: "How are hotfixes handled?",
					answer:
						"Versioning rules, channels, and fingerprints keep hotfixes isolated and predictable.",
				},
				item3: {
					question: "Do we need to replace our existing CI?",
					answer:
						"No. We integrate EAS with your current CI and reduce manual steps.",
				},
				item4: {
					question: "What do we receive at the end?",
					answer:
						"An audited setup, updated configs, and a release playbook your team can run.",
				},
			},
		},
	},
} as const;

export type Translations = InferTranslation<typeof en>;
