import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { SerializeFrom } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";
import { LinkTree } from "~/contents/blog/blog.server";
import { useTranslation } from "~/contents/i18n/translator";
import { GITHUB_URL } from "~/contents/navigation/domain";
import { getAppUrl } from "~/contents/navigation/get-url";
import { useAppConfig } from "~/routes/($lang)";
import { DesktopSidebar, MobileSidebar } from "../content/sidebar";
import { Button } from "../ui/button";
import { LanguageSelect } from "./language-select";

function Logo() {
  const { lang } = useParams();
  return (
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
  );
}

type ContentLayoutProps = {
  linksTree?: SerializeFrom<LinkTree>[];
  children: React.ReactNode;
};

export const Header = ({
  linksTree,
}: {
  linksTree?: SerializeFrom<LinkTree>[];
}) => {
  const t = useTranslation();
  const { DEFAULT_LANGUAGE } = useAppConfig();
  const { lang } = useParams();
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <MobileSidebar linksTree={linksTree} />
        <Logo />
        <div className="hidden md:flex items-center gap-4 ml-20 flex-1">
          <Link
            className="hover:text-primary font-semibold"
            to={getAppUrl({
              type: "blog",
              lang,
              DEFAULT_LANGUAGE,
            })}
          >
            {t((l) => l.header.blog)}
          </Link>
          <div className="flex-1" />
          <LanguageSelect />
          <Button variant="outline" size="icon" aria-label="GitHub" asChild>
            <Link to={GITHUB_URL}>
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export function ContentLayout({ linksTree, children }: ContentLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header linksTree={linksTree} />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 py-8">
          {!!linksTree ? (
            <DesktopSidebar linksTree={linksTree} />
          ) : (
            <aside className="w-64 flex-shrink-0 hidden md:block" />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
