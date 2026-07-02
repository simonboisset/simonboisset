import { describe, expect, it } from "vitest";
import {
	buildFaqStructuredData,
	buildSeo,
	stripHtml,
	toExcerpt,
} from "@/lib/seo";

describe("seo helpers", () => {
	it("builds canonical and alternate locale links", () => {
		const seo = buildSeo({
			title: "React Native to Expo migration",
			description: "Migration support for Expo apps.",
			path: "/",
			locale: "en-US",
		});

		expect(seo.links).toContainEqual({
			rel: "canonical",
			href: "https://simonboisset.com/en",
		});
		expect(seo.links).toContainEqual({
			rel: "alternate",
			hrefLang: "fr",
			href: "https://simonboisset.com/",
		});
		expect(seo.links).toContainEqual({
			rel: "alternate",
			hrefLang: "en",
			href: "https://simonboisset.com/en",
		});
		expect(seo.links).toContainEqual({
			rel: "alternate",
			hrefLang: "x-default",
			href: "https://simonboisset.com/",
		});
	});

	it("emits JSON-LD scripts when structured data is provided", () => {
		const faq = buildFaqStructuredData([
			{
				question: "Does esbuild type-check TypeScript?",
				answer: "No, run tsc separately.",
			},
		]);
		const seo = buildSeo({
			title: "Configure esbuild",
			description: "A practical esbuild guide.",
			path: "/blog/create-react-app-with-esbuild",
			locale: "en-US",
			structuredData: faq,
		});

		expect(seo.scripts).toHaveLength(1);
		expect(seo.scripts?.[0]).toMatchObject({
			type: "application/ld+json",
		});
		expect(JSON.parse(seo.scripts?.[0]?.children ?? "{}")).toMatchObject({
			"@type": "FAQPage",
		});
	});

	it("strips HTML and decodes common entities for snippets", () => {
		expect(stripHtml("<p>Build &amp; publish l&#39;app</p>")).toBe(
			"Build & publish l'app",
		);
		expect(toExcerpt("Créer &amp; publier un package", 80)).toBe(
			"Créer & publier un package",
		);
	});
});
