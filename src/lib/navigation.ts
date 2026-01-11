import { BookOpen, Home, type LucideIcon } from "lucide-react";

export interface NavItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	items?: NavSubItem[];
}

export interface NavSubItem {
	title: string;
	url: string;
}

export const navigationItems: NavItem[] = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Blog",
		url: "/blog",
		icon: BookOpen,
	},
];
