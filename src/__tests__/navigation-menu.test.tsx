// @vitest-environment jsdom

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
	NavigationMenu,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

describe("NavigationMenu", () => {
	it("keeps the mobile viewport aligned from the right edge of the trigger group", () => {
		render(
			<NavigationMenu>
				<NavigationMenuList />
			</NavigationMenu>,
		);

		const viewportWrapper = document.querySelector(
			'[data-slot="navigation-menu-viewport-wrapper"]',
		);
		const wrapperClassName = viewportWrapper?.className ?? "";

		expect(wrapperClassName).toContain("right-0");
		expect(wrapperClassName).toContain("justify-end");
		expect(wrapperClassName).toContain("md:left-0");
		expect(wrapperClassName).toContain("md:right-auto");
		expect(wrapperClassName).toContain("md:justify-center");
	});
});
