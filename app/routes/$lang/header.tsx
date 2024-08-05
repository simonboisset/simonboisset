import { Link } from "@remix-run/react";
import { Newspaper, PaintBucket } from "lucide-react";
import { Badge } from "~/ui/badge";
import { Button } from "~/ui/button";
import { DictionarySelect } from "./dictionary-select";
import { useTranslation } from "./route";
import { ToggleThemeButton } from "./toggle-theme-button";

export const Header = () => {
  const { t, lang } = useTranslation();

  return (
    <header className="mx-12 mt-6 rounded-full flex z-40 fixed top-0 left-0 right-0 justify-between items-center pl-2 pr-4 sm:gap-4 gap-2 h-16 bg-primary/10 backdrop-blur-md">
      <Link
        to={`/${lang}`}
        className="sm:text-2xl text-xl font-bold flex flex-row items-center gap-4"
        aria-label="Simon Boisset"
      >
        <img
          className="sm:size-12 size-6 rounded-full object-cover"
          src="https://avatars.githubusercontent.com/u/30298797?s=400&u=969434330e65f4c4eff90da6f18194c00cdcc6c6&v=4"
        />
        <span className="hidden sm:inline">Simon Boisset</span>
        <span className="sm:hidden">SB</span>
      </Link>

      <Link to="https://popsy.co/" className="hidden sm:inline">
        <Badge variant="secondary">
          <PaintBucket className="w-4 h-4 mr-2" />
          <span>Illustrations by Popsy</span>
        </Badge>
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
