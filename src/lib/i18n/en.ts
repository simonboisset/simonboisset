import type { InferTranslation } from "typed-locale";

export const en = {
	locale: "en",
	seo: {
		homeTitle:
			"Mobile-focused full-stack developer (React Native, Expo, React)",
		homeDescription:
			"Freelance mobile-focused full-stack developer specializing in React Native, Expo, and modern web apps.",
		blogTitle: "Blog",
	},
	nav: {
		brand: "Simon Boisset",
		tagline: "Mobile + Full-stack",
		home: "Home",
		services: "Services",
		projects: "Projects",
		testimonials: "Testimonials",
		blog: "Blog",
		bookCall: "Book a call",
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
	home: {
		hero: {
			eyebrow: "Mobile + Full-stack Freelance",
			title:
				"Building high-performance mobile experiences with React Native + Expo.",
			intro:
				"I'm Simon Boisset, a mobile-focused full-stack developer. I help teams ship polished apps, modernize legacy React Native stacks, and tighten delivery workflows.",
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
			title: "Expo-first delivery",
			description:
				"From SDK upgrades to EAS workflows, I build a release system that keeps shipping predictable.",
		},
		projectsSection: {
			label: "Selected projects",
			title: "Built for teams who move fast",
			description:
				"Productized mobile builds, operational dashboards, and internal tools that help teams ship with confidence.",
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
		},
		servicesSection: {
			label: "Services",
			title: "React + Expo expertise for modern teams",
			description:
				"From greenfield builds to legacy upgrades, I design delivery systems that keep your mobile roadmap moving.",
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
			button: "View details",
		},
		testimonialsSection: {
			label: "Testimonials",
			title: "Teams that trusted the process",
			description:
				"Partnerships built on clarity, velocity, and deep React Native experience.",
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
			title: "Let's build a mobile roadmap you can trust.",
			description:
				"Share your goals and I'll respond within 48 hours with next steps.",
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
		},
		legacy: {
			title: "React Native legacy to Expo migration",
			intro:
				"Modernize your mobile stack without breaking the roadmap. I guide teams through a safe migration to Expo, unlocking faster builds and a stable release process.",
			cta: "Plan a migration",
			highlights: {
				stackAlignment: {
					title: "Stack alignment",
					description:
						"Bring Expo, React Native, and native modules into a supported baseline.",
				},
				predictableReleases: {
					title: "Predictable releases",
					description:
						"Set up EAS pipelines, OTA updates, and release playbooks.",
				},
				handoff: {
					title: "Launch-ready handoff",
					description:
						"Documented workflows and team enablement for the next sprint.",
				},
			},
			deliverablesIntroTitle: "What you receive",
			deliverablesIntroDescription:
				"A detailed roadmap, upgraded codebase, and release process you can confidently own.",
			deliverables: {
				item1: "Technical audit of the existing React Native stack",
				item2: "Expo migration roadmap with risk assessment",
				item3: "Module-by-module upgrade plan with fallback paths",
				item4: "EAS build, submit, and OTA update pipeline",
				item5: "QA plan with release checklist",
			},
			processTitle: "A staged migration with low risk",
			processDescription:
				"Each phase is scoped to keep your team shipping while the migration progresses.",
			phases: {
				discovery: {
					title: "Discovery + audit",
					description:
						"Codebase review, dependency mapping, and migration feasibility analysis.",
				},
				migration: {
					title: "Migration execution",
					description:
						"Incremental upgrades, module replacements, and Expo configuration setup.",
				},
				launch: {
					title: "Launch + handoff",
					description:
						"Stabilization, release management, and documentation for your team.",
				},
			},
		},
		workflow: {
			title: "Expo workflow optimisation",
			intro:
				"Make builds faster, releases calmer, and handoffs clearer. I refine Expo pipelines so your team ships reliably every sprint.",
			cta: "Optimize my workflow",
			highlights: {
				releaseVelocity: {
					title: "Release velocity",
					description: "Shorter build times and fewer manual steps.",
				},
				confidence: {
					title: "Confidence",
					description: "Clear deployment guardrails and rollback paths.",
				},
				handoff: {
					title: "Team handoff",
					description: "Documentation and playbooks for every release.",
				},
			},
			outcomesTitle: "Workflow improvements you can feel",
			outcomesDescription:
				"Identify bottlenecks, streamline approvals, and keep releases calm.",
			outcomes: {
				item1: "Faster build and submit times",
				item2: "Stable CI/CD for iOS + Android",
				item3: "Clear release checklists and monitoring",
				item4: "Environment configuration and secrets audit",
			},
			focusTitle: "From CI/CD to release observability",
			focusDescription:
				"I target the workflow steps that create delays, handoffs, and unplanned downtime.",
			focusAreas: {
				area1: {
					title: "EAS pipeline tuning",
					description:
						"Optimize build profiles, caching, and parallelization for predictable releases.",
				},
				area2: {
					title: "Workflow reliability",
					description:
						"Upgrade SDKs, clean dependency graphs, and reduce flaky build failures.",
				},
				area3: {
					title: "Release visibility",
					description:
						"Add release notes, monitoring, and post-release review systems.",
				},
			},
		},
	},
} as const;

export type Translations = InferTranslation<typeof en>;
