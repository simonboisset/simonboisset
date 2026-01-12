import { Link, useRouter } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { NavItem, NavSubItem } from "@/lib/navigation";

interface NavMainProps {
	items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
	const router = useRouter();
	const pathname = router.state.location.pathname;

	const getItemPathname = (item: NavItem | NavSubItem) =>
		router.buildLocation({ to: item.to, params: item.params }).pathname;

	const isGroupActive = (item: NavItem) => {
		if (!item.items) return false;
		return item.items.some(
			(subItem) => pathname === getItemPathname(subItem),
		);
	};

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => {
						const isRoot = item.to === "/{-$locale}";
						if (!item.items || item.items.length === 0) {
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											to={item.to}
											params={item.params}
											activeProps={{
												className:
													"bg-accent text-accent-foreground",
											}}
											activeOptions={
												isRoot ? { exact: true } : undefined
											}
										>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						}

						return (
							<Collapsible
								key={item.title}
								className="group/collapsible"
								defaultOpen={isGroupActive(item)}
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<Link
															to={subItem.to}
															params={subItem.params}
															activeProps={{
																className:
																	"bg-sidebar-accent text-sidebar-accent-foreground",
															}}
														>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
