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
import type { NavItem } from "@/lib/navigation";

interface NavMainProps {
	items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
	const router = useRouter();
	const pathname = router.state.location.pathname;

	// Check if any submenu item is active
	const isGroupActive = (item: NavItem) => {
		if (!item.items) return false;
		return item.items.some((subItem) => pathname === subItem.url);
	};

	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => {
						// Render items without subitems
						if (!item.items || item.items.length === 0) {
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											to={item.url}
											activeProps={{
												className: "bg-accent text-accent-foreground",
											}}
											activeOptions={{ exact: item.url === "/" }}
										>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						}

						// Render items with collapsible subitems
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
															to={subItem.url}
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
