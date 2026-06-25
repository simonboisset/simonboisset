import type { InferTranslation } from "typed-locale";

export const en = {
	locale: "en",
	seo: {
		homeTitle: "React Native modernization with Expo - Simon Boisset",
		homeDescription:
			"Freelance React Native and Expo developer helping teams modernize mobile apps, stabilize releases, and stay grounded through Questovery.",
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
		projects: "Projects",
		testimonials: "Testimonials",
		blog: "Blog",
		blogAll: "View all posts",
		bookCall: "Book a call",
		aboutItems: {
			services: "Expo migration, EAS workflows, and mobile consulting.",
			projects: "Concrete mobile, web, and product delivery examples.",
			testimonials: "Client feedback on delivery and collaboration.",
			github: "Open-source work, experiments, and code samples.",
		},
	},
	footer: {
		description:
			"Freelance React Native and Expo developer, grounded by a real product: Questovery.",
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
			eyebrow: "React Native, Expo, and mobile delivery",
			title: "I modernize React Native apps with Expo.",
			intro:
				"I help teams move away from fragile mobile stacks, stabilize releases, and regain control of Expo/EAS. Questovery, my geolocated treasure hunt product, keeps that work grounded in real usage.",
			ctaPrimary: "Discuss an Expo migration",
			ctaSecondary: "Discover Questovery",
			highlights: {
				expertise: "Legacy RN migration",
				delivery: "Expo/EAS releases",
				performance: "Questovery product proof",
			},
		},
		availability: {
			label: "Current focus",
			status: "Mobile + product",
			badge: "Focused scope",
			items: {
				item1: "React Native legacy audits",
				item2: "Expo/EAS migration delivery",
				item3: "Field lessons from Questovery",
			},
		},
		signature: {
			label: "Operating lane",
			title: "Mobile apps that are easier to ship",
			description:
				"I turn fragile native workflows into fast QA, predictable store releases, and team ownership.",
		},
		projectsSection: {
			label: "Concrete cases",
			title: "Projects close to your challenges",
			description:
				"Examples of engagements where the work was to take over an existing base, ship to production, or make a team more autonomous.",
			productLabel: "Product / company",
			impactLabel: "Impact / contributions",
		},
		projects: {
			campingCarPark: {
				name: "CAMPING-CAR PARK - Mobile app modernization",
				product: {
					line1: "Consumer mobile app to book and manage campervan stays.",
				},
				impact: {
					line1:
						"Mobile redesign + migration from legacy React Native to Expo.",
					line2: "Mobile lead for project structure and team enablement.",
				},
				stack: {
					item1: "React Native",
					item2: "Expo",
					item3: "Mobile",
					item4: "Architecture",
				},
			},
			vaerdict: {
				name: "VAERDICT - Business web app re-architecture",
				product: {
					line1: "Web app for real estate wealth advisors.",
				},
				impact: {
					line1: "Codebase takeover and restructuring for scalability.",
					line2: "Technical lead + training to strengthen the internal team.",
				},
				stack: {
					item1: "Web",
					item2: "React",
					item3: "TypeScript",
					item4: "Architecture",
				},
			},
			linote: {
				name: "LiNote - Mobile app for social connection",
				product: {
					line1: "Mobile app to stay connected with elderly relatives.",
				},
				impact: {
					line1: "React Native build from scratch aligned with the web app.",
					line2:
						"Key features: reminders, messaging, photo sharing, video calls.",
				},
				stack: {
					item1: "React Native",
					item2: "Mobile",
					item3: "iOS",
					item4: "Android",
				},
			},
			silbo: {
				name: "Silbo - Health: web + field apps",
				product: {
					line1:
						"Healthcare startup: web app for patient flow optimization + field apps.",
				},
				impact: {
					line1: "Full product cycle to production with product partnership.",
					line2: "Focus on reliability, real-time, and iOS/Android ergonomics.",
				},
				stack: {
					item1: "Web",
					item2: "Mobile",
					item3: "Reliability",
					item4: "Real-time",
				},
			},
			monPontChanban: {
				name: "Mon Pont Chaban - Bordeaux bridge lift alerts",
				product: {
					line1:
						"Mobile app delivering push alerts for Bordeaux bridge lift times.",
				},
				impact: {
					line1: "Personalized notifications based on user time slots.",
					line2: "Notification scheduling powered by Trigger.dev.",
				},
				stack: {
					item1: "React Native",
					item2: "Expo",
					item3: "Push",
					item4: "Trigger.dev",
				},
			},
			questovery: {
				name: "Questovery - Geolocated treasure hunts",
				product: {
					line1:
						"Platform to create treasure hunts with a participant mobile app.",
				},
				impact: {
					line1: "Interactive experiences built on geolocation.",
					line2: "Custom routes for events and tourism.",
				},
				stack: {
					item1: "React Native",
					item2: "Mobile",
					item3: "Geolocation",
					item4: "Game design",
				},
			},
		},
		servicesSection: {
			label: "Two focus areas",
			title: "What I can do for your app",
			description:
				"I mostly step in when a React Native app needs solid Expo foundations and a delivery workflow the team can keep owning.",
		},
		focus: {
			migration: {
				title: "React Native to Expo migration",
				description:
					"Audit, migrate, and stabilize an existing app so your team can ship with Expo/EAS without fighting native complexity.",
				bullets: {
					item1: "Native dependency audit and migration roadmap",
					item2: "Incremental Expo/EAS rollout without blocking the roadmap",
					item3: "QA, store release, and hotfix playbook",
				},
				cta: "See the migration offer",
			},
			questovery: {
				title: "Questovery",
				description:
					"A geolocated treasure hunt platform with a participant mobile app. It is my real-world Expo lab for maps, offline behavior, geolocation, and field UX.",
				bullets: {
					item1: "React Native + Expo participant app",
					item2: "Geolocation, routes, and field constraints",
					item3: "SaaS creator experience connected to mobile delivery",
				},
				cta: "Open Questovery",
			},
		},
		method: {
			label: "Migration method",
			title: "How I make your Expo migration safer",
			description:
				"We reduce release risk first, then move step by step toward an Expo workflow the team can maintain.",
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
		testimonialsSection: {
			label: "Testimonials",
			title: "What teams say after working together",
			description: "Feedback from people who trusted me.",
		},
		testimonials: {
			eric: {
				quote:
					"Simon is great to work with: experienced, collaborative, and immediately involved. He adapted quickly and worked in synergy with our historic developer, giving us confidence in the long-term development of the project.",
				name: "Eric",
				role: "CEO, Vaerdict",
			},
			anthony: {
				quote:
					"Great experience with Simon. Easy communication, very professional, high code quality, and fast delivery. We trusted him with a new mission after this one.",
				name: "Anthony",
				role: "CEO, LiNote",
			},
			thomas: {
				quote:
					"I had the opportunity to work with Simon for over two years on my team. Simon is a true Full Stack developer: he improves UI components, backend or mobile, and can also optimize cloud infrastructure or CI/CD pipelines. He brings effective architecture ideas and quickly learns complex concepts.",
				name: "Thomas",
				role: "CTO, Silbo",
			},
		},
		cta: {
			label: "Ready to ship",
			title: "Let's talk about your mobile project.",
			description:
				"Share the context and I'll come back within 48 hours with clear next steps.",
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
