import { useFetcher } from "@remix-run/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/routes/$lang/route";
import { Button } from "~/ui/button";

export const ToggleThemeButton = () => {
  const fetcher = useFetcher();
  const { theme } = useTheme();

  const toggleTheme = () => {
    fetcher.submit({}, { method: "POST", action: "/en" });
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      size="icon"
      className="transition-colors duration-500 ease-in-out"
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
};
