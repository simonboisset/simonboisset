import { Link } from "@tanstack/react-router";
import type React from "react";
import { NavMain } from "@/components/blocks/nav-main";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { getNavigationItems } from "@/lib/navigation";
import { useI18n } from "@/lib/i18n/use-i18n";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { t, localeParam } = useI18n();
	const localeParams: Record<string, string> = localeParam
		? { locale: localeParam }
		: {};
	const navigationItems = getNavigationItems(t, localeParams);

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/{-$locale}" params={localeParams}>
								<div className="flex items-center gap-2">
									<img
										src="/tanstack-word-logo-white.svg"
										alt="TanStack Logo"
										className="h-8"
									/>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navigationItems} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
