import type { LucideIcon } from "lucide-react";

export type HomeAssets = {
	heroIllustrationUrl: string | null;
	heroPhotoUrl: string | null;
	legacyServiceIllustrationUrl: string | null;
	proofIllustrationUrl: string | null;
	risksIllustrationUrl: string | null;
	workflowServiceIllustrationUrl: string | null;
};

export type Testimonial = {
	quote: string;
	name: string;
};

export type RiskCard = {
	title: string;
	description: string;
	bullet: string;
	illustrationUrl: string | null;
};

export type MigrationPhase = {
	eyebrow: string;
	title: string;
	description: string;
	outcome: string;
	icon: LucideIcon;
};

export type MigrationGate = {
	label: string;
	title: string;
	description: string;
	icon: LucideIcon;
};

export type MigrationProgressStatus = "done" | "current" | "pending";

export type MigrationStatusLabels = Record<MigrationProgressStatus, string>;

export type MigrationProgressItem = {
	label: string;
	title: string;
	description: string;
	icon: LucideIcon;
	step?: string;
	outcome?: string;
};

export type HomeContent = {
	hero: {
		eyebrow: string;
		title: string;
		intro: string;
		ctaPrimary: string;
		ctaSecondary: string;
		highlights: {
			expertise: string;
			delivery: string;
			performance: string;
		};
	};
	servicesSection: {
		title: string;
		description: string;
	};
	testimonialsSection: {
		title: string;
		description: string;
	};
	methodSection: {
		title: string;
		description: string;
	};
	cta: {
		title: string;
		description: string;
		button: string;
	};
	testimonials: Testimonial[];
	riskCards: RiskCard[];
	migrationPhases: MigrationPhase[];
	migrationStart: MigrationGate;
	migrationEnd: MigrationGate;
	migrationStatusLabels: MigrationStatusLabels;
};
