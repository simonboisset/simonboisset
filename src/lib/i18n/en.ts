import type { InferTranslation } from "typed-locale";

export const en = {
	locale: "en",
	seo: {
		homeTitle:
			"Mobile-focused full-stack developer (React Native, Expo, React)",
		homeDescription:
			"Freelance mobile-focused full-stack developer specializing in React Native, Expo, and modern web apps.",
		blogTitle: "Blog",
		cvTitle: "Resume",
		cvDescription:
			"Resume of Simon Boisset, mobile-focused full-stack developer (React Native, Expo, React, TypeScript).",
	},
	nav: {
		brand: "Simon Boisset",
		tagline: "Mobile + Full-stack",
		home: "Home",
		about: "About",
		services: "Services",
		products: "Products",
		saasStarter: "Keystone Stack",
		projects: "Projects",
		testimonials: "Testimonials",
		blog: "Blog",
		blogAll: "View all posts",
		bookCall: "Book a call",
		aboutItems: {
			services: "How I help teams ship mobile products.",
			projects: "Recent mobile work and measurable outcomes.",
			testimonials: "Client feedback on delivery and collaboration.",
			github: "Open-source work, experiments, and code samples.",
		},
	},
	footer: {
		description:
			"Freelance mobile + full-stack developer. React Native, Expo, React, TypeScript.",
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
		heroTitle: "Thoughts on shipping great mobile products.",
		description:
			"Field notes on mobile delivery, Expo workflows, and full-stack craft.",
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
				stack: "React Native, Expo, Push Notification, Trigger.dev",
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
					"Focused on web and product engineering, then expanded into mobile architecture, release engineering, and full-stack delivery.",
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
			eyebrow: "Mobile + Full-stack Freelance",
			title: "Solid mobile apps, ready for production.",
			intro:
				"I'm Simon Boisset, a mobile/full-stack developer. I help teams ship React Native/Expo apps, clean up legacy stacks, and make releases predictable.",
			ctaPrimary: "Start a project",
			ctaSecondary: "View services",
			ctaGithub: "GitHub",
			highlights: {
				expertise: "React Native + Expo expertise",
				delivery: "Production-ready delivery",
				performance: "Performance & release tuning",
			},
		},
		availability: {
			label: "Availability",
			status: "Now booking",
			badge: "Open slots",
			items: {
				item1: "Product discovery + roadmapping",
				item2: "Mobile app delivery, end-to-end",
				item3: "Release automation and QA support",
			},
		},
		signature: {
			label: "Signature focus",
			title: "Expo delivery, clear and reliable",
			description:
				"A simple Expo/EAS workflow to ship regularly without surprises.",
		},
		projectsSection: {
			label: "Selected projects",
			title: "Examples of shipped work",
			description:
				"Mobile apps, web apps, and professional tools delivered for operational teams.",
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
				name: "Mon Pont Chanban - Bordeaux bridge lift alerts",
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
			label: "Services",
			title: "React + Expo, pragmatic and hands-on",
			description:
				"MVP, migration, or legacy cleanup: I set a solid base to keep shipping.",
		},
		serviceLines: {
			mobile: {
				title: "Mobile product delivery",
				description:
					"React Native and Expo builds from MVP to production, with scalable architecture.",
			},
			fullstack: {
				title: "Full-stack support",
				description:
					"API design, data modeling, and back office dashboards to complement mobile apps.",
			},
			design: {
				title: "Design-to-dev collaboration",
				description:
					"Crafted UIs, animation polish, and UI kits that stay consistent across teams.",
			},
		},
		productized: {
			legacy: {
				title: "React Native legacy to Expo migration",
				description:
					"Move from legacy tooling to a modern Expo stack without disrupting your roadmap.",
				bullets: {
					item1: "Audit + migration plan",
					item2: "Incremental rollout strategy",
					item3: "Release-ready Expo build pipeline",
				},
			},
			workflow: {
				title: "Expo workflow optimisation",
				description:
					"Speed up build times, improve reliability, and keep CI/CD predictable.",
				bullets: {
					item1: "EAS build + submit tuning",
					item2: "Environment + secrets audit",
					item3: "Monitoring and release playbooks",
				},
			},
			keystone: {
				title: "Keystone Stack",
				description:
					"The SaaS foundation for web, mobile, and API with a solid starting point.",
				bullets: {
					item1: "Auth, orgs, and billing ready",
					item2: "Shared SDK + design system",
					item3: "Quality, CI/CD, and analytics built in",
				},
			},
			button: "View details",
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
				"Share the context and I'll come back within 48h with clear next steps.",
			button: "Schedule a call",
		},
	},
	products: {
		saasStarter: {
			seoTitle: "Keystone Stack (web, mobile, API)",
			seoDescription:
				"A solid, AI-ready SaaS stack for web, mobile, and API. Auth, orgs, billing-ready flows, analytics, and a shared SDK.",
			hero: {
				eyebrow: "Keystone Stack",
				title: "A solid, AI-ready SaaS stack.",
				subtitle: "Build fast. Stay stable.",
				ctaPrimary: "Join the waitlist",
				ctaSecondary: "See the stack",
				badges: {
					auth: "Auth + orgs",
					sdk: "Shared SDK",
					design: "AI-ready",
				},
				highlights: {
					speed: {
						title: "Ship fast",
						description: "Everything wired to launch an MVP in days.",
					},
					quality: {
						title: "Quality guardrails",
						description: "Strict TypeScript, Biome, no bypasses.",
					},
					scale: {
						title: "Consistent multi-platform",
						description: "Shared SDK, oRPC, and TanStack Form.",
					},
				},
				preview: {
					title: "What you get",
					tag: "End-to-end",
				},
			},
			stack: {
				title: "What you get, immediately usable",
				subtitle: "Core apps and shared types wired to ship fast.",
				items: {
					web: {
						title: "Web app",
						description: "Vite + TanStack Start + Tailwind + shadcn UI.",
					},
					api: {
						title: "API layer",
						description: "Hono + oRPC + Zod + Better Auth.",
					},
					data: {
						title: "Database",
						description: "Drizzle ORM + Postgres + migrations.",
					},
					mobile: {
						title: "Mobile",
						description: "Expo + React Native + shared SDK + EAS workflows.",
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
				title: "Included by default",
				subtitle: "Product features that save weeks of setup.",
				items: {
					auth: {
						title: "Auth + 2FA",
						description: "Email, magic link, Turnstile, and TOTP.",
					},
					orgs: {
						title: "Organizations & invites",
						description: "Workspaces, roles, and team invitations.",
					},
					billing: {
						title: "Billing-ready",
						description: "Customer and subscription flows ready to enable.",
					},
					admin: {
						title: "Admin analytics",
						description: "Activation and adoption KPIs built in.",
					},
					sdk: {
						title: "Shared SDK",
						description: "oRPC client + TanStack Query/Form.",
					},
					content: {
						title: "Directus CMS",
						description: "Localized blog, docs, and legal content.",
					},
				},
			},
			designSystem: {
				title: "Design system, shared everywhere",
				subtitle: "A single set of tokens powers web and mobile UI.",
				items: {
					tokens: {
						title: "Shared tokens",
						description: "Colors, radius, spacing, and motion in one source.",
					},
					web: {
						title: "Web UI",
						description: "shadcn UI wired to the same tokens.",
					},
					mobile: {
						title: "Mobile UI",
						description: "Uniwind consumes the same token system.",
					},
				},
			},
			quality: {
				title: "Ship fast, regain control",
				subtitle:
					"Start with vibe coding, then take the wheel with clean code and clear rules.",
				items: {
					typing: {
						title: "MVP in days",
						description:
							"Launch a working product quickly with the core flows already wired.",
					},
					lint: {
						title: "Vibe-code friendly",
						description:
							"Move fast early without breaking structure or getting stuck later.",
					},
					agents: {
						title: "Controlled code + rules",
						description:
							"Strict conventions, shared contracts, and rules you can enforce.",
					},
				},
			},
			showcase: {
				title: "Product preview",
				subtitle: "A few key screens and flows (placeholders).",
				items: {
					item1: {
						title: "Organization dashboard",
						description: "Members, billing, and status overview.",
					},
					item2: {
						title: "2FA onboarding",
						description: "TOTP setup and backup codes.",
					},
					item3: {
						title: "Admin analytics",
						description: "Activation and adoption KPIs.",
					},
					item4: {
						title: "Mobile pipeline",
						description: "Build, submit, and updates via EAS.",
					},
				},
			},
			waitlist: {
				title: "Join the waitlist",
				subtitle: "Drop your email to get early access when it ships.",
				form: {
					emailLabel: "Work email",
					emailPlaceholder: "you@company.com",
					profileLabel: "Profile",
					profilePlaceholder: "Select your profile",
					profileOptions: {
						pro: "Pro",
						hobby: "Hobby",
						agency: "Agency",
					},
					projectTypesLabel: "Project type",
					projectTypes: {
						side: "Side project",
						client: "Client project",
					},
					painLabel: "What should this template solve for you?",
					painPlaceholder: "Onboarding time, auth setup, billing, etc.",
					budgetLabel: "Budget you could pay for this template",
					budgetPlaceholder: "e.g. 490",
					submit: "Join the waitlist",
				},
				successTitle: "You're on the list!",
				successDescription: "We'll reach out with early access and updates.",
				errors: {
					required: "This field is required.",
					email: "Enter a valid email.",
					projectTypes: "Select at least one project type.",
					budget: "Enter a budget.",
					submit: "Something went wrong. Please try again.",
				},
			},
			faq: {
				title: "Frequently asked questions",
				subtitle: "Answers to the most common setup questions.",
				item1: {
					question: "Is this production-ready?",
					answer:
						"Yes. The stack ships with auth, analytics, and CMS flows wired end-to-end.",
				},
				item2: {
					question: "Can I use my own CMS or database?",
					answer:
						"Absolutely. You can swap Directus or Drizzle with your preferred tools.",
				},
				item3: {
					question: "Does it support multiple locales?",
					answer:
						"Yes. Routing, dictionary, and content pipeline are localized by default.",
				},
				item4: {
					question: "Can I get help launching?",
					answer:
						"Yes. The template is built to support guided onboarding if needed.",
				},
			},
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
			title: "React Native legacy to Expo migration",
			intro:
				"A fixed-fee migration program to move a legacy React Native app to Expo, upgrade the stack, and meet App Store / Play Store compliance. Full native dependency audit, Expo compatibility, and an EAS delivery strategy (includes Expo workflow optimization).",
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
				"An up-to-date app, store compliant, with an Expo delivery system you control.",
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
