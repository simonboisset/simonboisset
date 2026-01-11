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
import { navigationItems } from "@/lib/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
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
