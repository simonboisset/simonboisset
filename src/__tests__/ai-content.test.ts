import { describe, expect, it } from "vitest";
import {
	buildAgentContentResponse,
	getAgentContentUrls,
	getAgentReadableRedirectPath,
	renderDocText,
	renderHomeMarkdown,
	renderHomeText,
	renderPostMarkdown,
	renderPostText,
} from "@/lib/ai-content";
import type { DocDetails, PostDetails } from "@/lib/directus";

const post: PostDetails = {
	slug: "expo-migration",
	publishedAt: "2026-01-10T12:00:00.000Z",
	publishedAtLabel: "January 10, 2026",
	illustration: null,
	imageUrl: null,
	title: "Expo migration",
	content:
		'# Release path\n\nUse [EAS Build](https://expo.dev/eas) before store submission.\n\n```ts\nconsole.log("ship");\n```',
};

const doc: DocDetails = {
	slug: "privacy",
	title: "Privacy policy",
	content: "  ## Data\n\n<p>No hidden tracking.</p>",
	updatedAtLabel: "January 12, 2026",
};

describe("agent-readable content", () => {
	it("renders a Markdown homepage with canonical metadata and sections", () => {
		const content = renderHomeMarkdown("en-US");

		expect(content).toContain("# React Native to Expo migration.");
		expect(content).toContain("Type: homepage");
		expect(content).toContain("Language: en-US");
		expect(content).toContain("Canonical URL: https://simonboisset.com/en");
		expect(content).toContain("## What I secure during an Expo migration.");
		expect(content).toContain("- Native surface:");
	});

	it("renders a plain-text homepage without Markdown or HTML markup", () => {
		const content = renderHomeText("fr-FR");

		expect(content).toContain("Migration React Native vers Expo.");
		expect(content).toContain("Type: homepage");
		expect(content).toContain("Canonical URL: https://simonboisset.com/");
		expect(content).not.toMatch(/<[^>]+>/);
		expect(content).not.toContain("##");
		expect(content).not.toContain("- ");
	});

	it("renders posts as Markdown while keeping Markdown links and code blocks", () => {
		const content = renderPostMarkdown(post, "en-US");

		expect(content).toContain("# Expo migration");
		expect(content).toContain("Type: blog post");
		expect(content).toContain(
			"Canonical URL: https://simonboisset.com/en/blog/expo-migration",
		);
		expect(content).toContain("[EAS Build](https://expo.dev/eas)");
		expect(content).toContain("```ts");
	});

	it("renders posts as text with links expanded and no HTML tags", () => {
		const content = renderPostText(post, "en-US");

		expect(content).toContain("Expo migration");
		expect(content).toContain("Type: blog post");
		expect(content).toContain(
			"Canonical URL: https://simonboisset.com/en/blog/expo-migration",
		);
		expect(content).toContain("EAS Build: https://expo.dev/eas");
		expect(content).toContain('console.log("ship");');
		expect(content).not.toMatch(/<[^>]+>/);
		expect(content).not.toContain("[EAS Build]");
	});

	it("renders docs as text with updated metadata", () => {
		const content = renderDocText(doc, "en-US");

		expect(content).toContain("Privacy policy");
		expect(content).toContain("Type: document");
		expect(content).toContain("Updated: January 12, 2026");
		expect(content).toContain("Data");
		expect(content).toContain("\nData\n");
		expect(content).toContain("No hidden tracking.");
		expect(content).not.toMatch(/<[^>]+>/);
		expect(content).not.toContain("##");
	});

	it("builds stable Markdown and text URLs for canonical pages", () => {
		expect(getAgentContentUrls("/", "fr-FR")).toEqual({
			markdownUrl: "https://simonboisset.com/content/fr/home.md",
			textUrl: "https://simonboisset.com/content/fr/home.txt",
		});
		expect(getAgentContentUrls("/blog/expo-migration", "en-US")).toEqual({
			markdownUrl: "https://simonboisset.com/content/en/blog/expo-migration.md",
			textUrl: "https://simonboisset.com/content/en/blog/expo-migration.txt",
		});
	});

	it("maps page-level Markdown and text aliases to content endpoints", () => {
		expect(
			getAgentReadableRedirectPath(
				"/blog/expo-white-label-on-premise-apps.md",
				"fr-FR",
			),
		).toBe("/content/fr/blog/expo-white-label-on-premise-apps.md");
		expect(getAgentReadableRedirectPath("/docs/privacy.txt", "en-US")).toBe(
			"/content/en/docs/privacy.txt",
		);
		expect(
			getAgentReadableRedirectPath("/blog/expo-migration", "fr-FR"),
		).toBeNull();
	});

	it("builds noindex responses with canonical Link headers", () => {
		const response = buildAgentContentResponse({
			body: "Plain content",
			canonicalUrl: "https://simonboisset.com/en/blog/expo-migration",
			format: "text",
		});

		expect(response.headers.get("Content-Type")).toBe(
			"text/plain; charset=utf-8",
		);
		expect(response.headers.get("X-Robots-Tag")).toBe("noindex, follow");
		expect(response.headers.get("Link")).toBe(
			'<https://simonboisset.com/en/blog/expo-migration>; rel="canonical"',
		);
	});
});
