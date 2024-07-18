import { Link } from "@remix-run/react";
import { Code2, Newspaper } from "lucide-react";
import { Button } from "~/ui/button";
import { DictionarySelect } from "./dictionary-select";
import { useTranslation } from "./route";
import { ToggleThemeButton } from "./toggle-theme-button";

export const Header = () => {
  const { t, lang } = useTranslation();

  return (
    <header className="mx-12 mt-6 rounded-full flex z-40 fixed top-0 left-0 right-0 justify-between items-center px-4 sm:gap-4 gap-2 h-16 bg-foreground/10 backdrop-blur-md">
      <Link
        to={`/${lang}`}
        className="sm:text-2xl text-xl font-bold flex flex-row items-center gap-4"
        aria-label="Simon Boisset"
      >
        <Code2 className="sm:w-8 sm:h-8 w-6 h-6" />
        <span className="hidden sm:inline">Simon Boisset</span>
        <span className="sm:hidden">SB</span>
      </Link>
      <div className="flex-1" />
      <Button
        variant="ghost"
        size="rounded"
        asChild
        className="flex flex-row gap-4"
      >
        <Link to={`/${lang}/blog`} aria-label={t((l) => l.footer.blog)}>
          <Newspaper />
          <span className="hidden sm:inline">{t((l) => l.footer.blog)}</span>
        </Link>
      </Button>
      <DictionarySelect value={lang} />
      <ToggleThemeButton />
    </header>
  );
};
