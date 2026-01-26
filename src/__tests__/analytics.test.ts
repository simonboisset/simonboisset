import { describe, expect, it } from "vitest";
import {
	buildPageViewProperties,
	getPageContext,
	getUtmParams,
	normalizePathname,
} from "@/lib/analytics";

describe("analytics helpers", () => {
	it("normalizes pathnames", () => {
		expect(normalizePathname("/")).toBe("/");
		expect(normalizePathname("/blog/")).toBe("/blog");
		expect(normalizePathname("/docs/privacy/")).toBe("/docs/privacy");
	});

	it("derives page context from paths", () => {
		expect(getPageContext("/")).toEqual({ pageType: "home" });
		expect(getPageContext("/blog")).toEqual({
			pageType: "blog_index",
			contentType: "blog",
		});
		expect(getPageContext("/blog/hello-world")).toEqual({
			pageType: "blog_post",
			contentType: "blog",
			slug: "hello-world",
		});
		expect(getPageContext("/docs")).toEqual({
			pageType: "docs_index",
			contentType: "doc",
		});
		expect(getPageContext("/docs/privacy")).toEqual({
			pageType: "doc",
			contentType: "doc",
			slug: "privacy",
		});
		expect(getPageContext("/services/expo-workflow-optimization")).toEqual({
			pageType: "service",
			contentType: "service",
			slug: "expo-workflow-optimization",
		});
		expect(getPageContext("/products/saas-starter-template")).toEqual({
			pageType: "product",
			contentType: "product",
			slug: "saas-starter-template",
		});
	});

	it("extracts UTM params safely", () => {
		expect(getUtmParams("")).toEqual({});
		expect(getUtmParams("?utm_source=google&utm_medium=cpc")).toEqual({
			utm_source: "google",
			utm_medium: "cpc",
		});
		expect(
			getUtmParams("?utm_source=google&utm_campaign=spring&unused=1"),
		).toEqual({
			utm_source: "google",
			utm_campaign: "spring",
		});
	});

	it("builds page view properties with locale-stripped paths", () => {
		const props = buildPageViewProperties({
			pathname: "/fr/blog/hello-world",
			searchStr: "?utm_source=google",
			hash: "#intro",
			locale: "fr-FR",
		});

		expect(props).toMatchObject({
			path: "/blog/hello-world",
			page_type: "blog_post",
			content_type: "blog",
			slug: "hello-world",
			utm_source: "google",
			hash: "intro",
			locale: "fr-FR",
		});
	});
});
