import type { Locale } from "@/lib/i18n/locale";

type BlogSeoLocaleOverride = {
	title: string;
	description: string;
	summary: string;
	keyPoints: string[];
	faq: { question: string; answer: string }[];
};

type BlogSeoOverride = Record<Locale, BlogSeoLocaleOverride>;

const blogSeoOverrides: Record<string, BlogSeoOverride> = {
	"create-react-app-with-esbuild": {
		"fr-FR": {
			title: "Configurer esbuild pour une app React TypeScript",
			description:
				"Guide pratique esbuild pour créer une application React TypeScript: installation, configuration JSX, bundle rapide et erreurs fréquentes.",
			summary:
				"Cet article répond aux recherches autour de esbuild, React et TypeScript avec une configuration directe à reprendre dans un projet.",
			keyPoints: [
				"Configurer esbuild pour compiler JSX et TypeScript.",
				"Comprendre quand esbuild suffit et quand un framework complet devient utile.",
				"Identifier les erreurs courantes de build, d'environnement et de bundle.",
			],
			faq: [
				{
					question: "esbuild peut-il remplacer Vite pour une app React ?",
					answer:
						"Oui pour une base légère ou un prototype. Vite reste plus complet pour le dev server, les plugins et l'expérience d'équipe.",
				},
				{
					question: "esbuild gère-t-il TypeScript nativement ?",
					answer:
						"esbuild transpile TypeScript rapidement, mais il ne remplace pas tsc pour la vérification de types.",
				},
			],
		},
		"en-US": {
			title: "Configure esbuild for a React TypeScript app",
			description:
				"A practical esbuild guide for React TypeScript apps: JSX setup, fast bundling, npm scripts, and common build errors.",
			summary:
				"This article targets esbuild, React, and TypeScript searches with a focused setup you can adapt to small apps and prototypes.",
			keyPoints: [
				"Configure esbuild to compile JSX and TypeScript.",
				"Know when esbuild is enough and when a full framework is a better fit.",
				"Debug common build, environment, and bundle issues.",
			],
			faq: [
				{
					question: "Can esbuild replace Vite for a React app?",
					answer:
						"Yes for a small base or prototype. Vite is still stronger for dev server ergonomics, plugins, and team workflows.",
				},
				{
					question: "Does esbuild type-check TypeScript?",
					answer:
						"No. esbuild transpiles TypeScript quickly, but tsc should still run for type checking.",
				},
			],
		},
	},
	"publish-npm-library-with-esbuild": {
		"fr-FR": {
			title: "Publier un package npm avec esbuild et TypeScript",
			description:
				"Créer, builder et publier un package npm avec esbuild, TypeScript et React: exports, scripts, bundle et publication.",
			summary:
				"Ce guide cible les recherches esbuild npm et npm esbuild avec un parcours de publication complet pour une librairie TypeScript.",
			keyPoints: [
				"Structurer un package npm avec TypeScript et exports.",
				"Utiliser esbuild pour produire un bundle rapide et lisible.",
				"Préparer la publication npm sans casser les consommateurs du package.",
			],
			faq: [
				{
					question: "esbuild est-il adapté pour publier une librairie npm ?",
					answer:
						"Oui pour produire rapidement des builds JavaScript. Il faut compléter avec tsc pour les types et vérifier les exports package.json.",
				},
				{
					question: "Faut-il publier le code source ou seulement le bundle ?",
					answer:
						"Publiez le bundle, les types et les fichiers nécessaires au runtime. Le package.json doit déclarer clairement main, module, types et exports.",
				},
			],
		},
		"en-US": {
			title: "Publish an npm package with esbuild and TypeScript",
			description:
				"Build and publish an npm package with esbuild, TypeScript, and React: exports, scripts, bundle format, and release checks.",
			summary:
				"This guide targets esbuild npm and npm esbuild searches with a complete publishing path for a TypeScript library.",
			keyPoints: [
				"Structure an npm package with TypeScript and exports.",
				"Use esbuild for fast JavaScript bundles.",
				"Prepare npm publication without breaking package consumers.",
			],
			faq: [
				{
					question: "Is esbuild good for publishing an npm library?",
					answer:
						"Yes for fast JavaScript builds. Pair it with tsc for declaration files and verify package.json exports.",
				},
				{
					question: "Should an npm package publish source or only bundles?",
					answer:
						"Publish the bundle, type declarations, and runtime files. main, module, types, and exports should point to stable outputs.",
				},
			],
		},
	},
	"create-typescript-library-tsup": {
		"fr-FR": {
			title: "Créer une librairie TypeScript avec tsup",
			description:
				"Créer une librairie TypeScript avec tsup: configuration, exports, types, scripts npm et publication propre.",
			summary:
				"Ce guide répond aux recherches tsup, tsup npm et tsup TypeScript avec une base de librairie claire et publiable.",
			keyPoints: [
				"Configurer tsup pour générer les formats utiles.",
				"Publier les types TypeScript avec le package.",
				"Préparer les exports npm pour Node, bundlers et consommateurs TypeScript.",
			],
			faq: [
				{
					question: "Pourquoi utiliser tsup pour une librairie TypeScript ?",
					answer:
						"tsup simplifie la configuration de build et s'appuie sur esbuild pour produire rapidement les sorties JavaScript attendues.",
				},
				{
					question: "tsup génère-t-il les types TypeScript ?",
					answer:
						"tsup peut orchestrer la génération des déclarations, mais il faut vérifier la configuration dts et le champ types du package.",
				},
			],
		},
		"en-US": {
			title: "Create a TypeScript library with tsup",
			description:
				"Create a TypeScript library with tsup: build config, exports, declaration files, npm scripts, and clean publishing.",
			summary:
				"This guide targets tsup, tsup npm, and tsup TypeScript searches with a practical library baseline.",
			keyPoints: [
				"Configure tsup for the output formats your users need.",
				"Ship TypeScript declarations with the package.",
				"Prepare npm exports for Node, bundlers, and TypeScript consumers.",
			],
			faq: [
				{
					question: "Why use tsup for a TypeScript library?",
					answer:
						"tsup keeps build configuration compact and uses esbuild to produce JavaScript outputs quickly.",
				},
				{
					question: "Does tsup generate TypeScript types?",
					answer:
						"tsup can orchestrate declaration generation, but the dts option and package types field still need to be checked.",
				},
			],
		},
	},
	"i18n-type-safe-approach": {
		"fr-FR": {
			title: "i18n type-safe avec React et TypeScript",
			description:
				"Approche i18n type-safe pour React et TypeScript: dictionnaires typés, autocomplétion, refactors fiables et limites pratiques.",
			summary:
				"Ce contenu clarifie l'intérêt d'une i18n type-safe pour les équipes React qui veulent éviter les clés manquantes et les traductions fragiles.",
			keyPoints: [
				"Typage des clés de traduction et des variables.",
				"Refactor plus fiable des contenus localisés.",
				"Compromis entre DX, validation runtime et organisation des dictionnaires.",
			],
			faq: [
				{
					question: "Pourquoi rendre l'i18n type-safe ?",
					answer:
						"Le typage limite les clés manquantes, améliore l'autocomplétion et rend les refactors de contenus plus sûrs.",
				},
				{
					question: "Une i18n type-safe remplace-t-elle la relecture humaine ?",
					answer:
						"Non. Elle fiabilise la structure technique, mais la qualité linguistique reste une revue éditoriale.",
				},
			],
		},
		"en-US": {
			title: "Type-safe i18n with React and TypeScript",
			description:
				"A type-safe i18n approach for React and TypeScript: typed dictionaries, autocomplete, safer refactors, and practical tradeoffs.",
			summary:
				"This article targets type-safe i18n searches by showing how typed dictionaries reduce missing keys and fragile translations.",
			keyPoints: [
				"Type translation keys and interpolation variables.",
				"Refactor localized content with stronger feedback.",
				"Balance developer experience, runtime validation, and dictionary structure.",
			],
			faq: [
				{
					question: "Why make i18n type-safe?",
					answer:
						"Typing reduces missing keys, improves autocomplete, and makes content refactors safer.",
				},
				{
					question: "Does type-safe i18n replace translation review?",
					answer:
						"No. It protects the technical structure, but language quality still needs editorial review.",
				},
			],
		},
	},
	"share-packages-monorepo": {
		"fr-FR": {
			title: "Partager des packages dans un monorepo Turborepo",
			description:
				"Partager du code dans un monorepo Turborepo: packages npm internes, scripts, dépendances workspace et pièges courants.",
			summary:
				"Ce guide cible les recherches Turborepo et turborepo npm avec une approche concrète pour partager du code entre apps.",
			keyPoints: [
				"Isoler le code partagé dans des packages internes.",
				"Configurer les dépendances workspace et les scripts de build.",
				"Éviter les cycles et les imports fragiles entre applications.",
			],
			faq: [
				{
					question: "Quand créer un package partagé dans un monorepo ?",
					answer:
						"Créez un package quand plusieurs apps consomment le même contrat, composant ou helper avec un cycle de vie commun.",
				},
				{
					question: "Turborepo remplace-t-il npm workspaces ?",
					answer:
						"Non. Turborepo orchestre les tâches; les workspaces gèrent la résolution et les liens entre packages.",
				},
			],
		},
		"en-US": {
			title: "Share packages in a Turborepo monorepo",
			description:
				"Share code in a Turborepo monorepo: internal npm packages, workspace dependencies, build scripts, and common pitfalls.",
			summary:
				"This guide targets Turborepo and turborepo npm searches with a practical model for sharing code across apps.",
			keyPoints: [
				"Move shared code into internal packages.",
				"Configure workspace dependencies and build scripts.",
				"Avoid cycles and fragile imports between applications.",
			],
			faq: [
				{
					question: "When should a monorepo use a shared package?",
					answer:
						"Create a package when several apps consume the same contract, component, or helper with a shared lifecycle.",
				},
				{
					question: "Does Turborepo replace npm workspaces?",
					answer:
						"No. Turborepo orchestrates tasks; workspaces resolve and link packages.",
				},
			],
		},
	},
};

export const getBlogSeoOverride = (slug: string, locale: Locale) =>
	blogSeoOverrides[slug]?.[locale] ?? null;
