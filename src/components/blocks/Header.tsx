import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
	return (
		<header className="flex h-16 items-center gap-4 border-b px-4">
			<SidebarTrigger />
		</header>
	);
}
