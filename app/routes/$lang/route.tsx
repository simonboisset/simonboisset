import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createTranslator } from "typed-locale";
import { useMatchedData } from "~/domains/core/hooks/use-matched-data";
import { sessionService } from "~/domains/core/session.server";
import { getTranslation, languageSchema } from "~/domains/i18n";
import { cn } from "~/ui/utils";
import { Header } from "./header";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "POST") {
    const theme = await sessionService.theme.get(request.headers);
    const newTheme = theme?.theme === "dark" ? "light" : "dark";
    const { headers } = await sessionService.theme.set(request.headers, {
      theme: newTheme,
    });
    return json({}, { headers });
  }
  return {};
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const langFromCookie = await sessionService.language.get(request.headers);
  const langFromParamsValidated = languageSchema.safeParse(params.lang);
  const defaultlangValidated = languageSchema.safeParse(
    request.headers.get("Accept-Language")?.split(",")[0].split("-")[0]
  );

  if (langFromParamsValidated.success) {
    const themeSession = await sessionService.theme.get(request.headers);
    const themeSystem =
      request.headers.get("Sec-CH-Prefers-Color-Scheme") === "dark"
        ? "dark"
        : "light";
    const theme = themeSession?.theme || themeSystem;
    const lang = langFromParamsValidated.data;
    const translations = getTranslation(lang);
    if (langFromCookie?.lang !== lang) {
      const { headers } = await sessionService.language.set(request.headers, {
        lang,
      });

      return json({ translations, lang, theme }, { headers });
    }

    return { translations, lang, theme };
  }
  const locale =
    langFromCookie?.lang ||
    (defaultlangValidated.success && defaultlangValidated.data) ||
    "en";

  const urlWithoutHost = request.url.split("/").slice(3);

  throw redirect(`/${locale}/${urlWithoutHost.join("/")}`, { status: 301 });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const t = createTranslator(data.translations);
  return [
    { title: `Simon Boisset |  ${t((l) => l.home.title)}` },
    { name: "description", content: t((l) => l.home.description) },
  ];
};

export const useTheme = () => {
  const { theme } = useMatchedData<typeof loader>("routes/$lang");
  return { theme };
};

export const useTranslation = () => {
  const { translations, lang } = useMatchedData<typeof loader>("routes/$lang");
  const t = createTranslator(translations);
  return { t, lang };
};

export default function LangPage() {
  const { theme } = useLoaderData<typeof loader>();
  return (
    <div
      className={cn(
        theme === "light" ? "" : "dark",
        "min-h-screen flex flex-col transition-colors duration-500 ease-in-out",
        "bg-background"
      )}
    >
      <div
        className={cn(
          theme === "light" ? "" : "dark",
          "min-h-screen flex flex-col transition-colors duration-500 ease-in-out",
          "text-primary bg-background"
        )}
      >
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
