import {
  LoaderFunctionArgs,
  MetaFunction,
  SerializeFrom,
} from "@remix-run/node";
import { Outlet, useMatches } from "@remix-run/react";
import {
  DEFAULT_LANGUAGE,
  dictionary,
  Language,
  TranslationProvider,
} from "~/contents/i18n/translator";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { lang } = params;
  const validLang =
    lang && lang in dictionary ? (lang as Language) : DEFAULT_LANGUAGE;

  return {
    title: dictionary[validLang].home.title,
    description: dictionary[validLang].home.description,
    DEFAULT_LANGUAGE,
  } as const;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  return [
    { title: `Simon Boisset | ${data.title}` },
    { name: "description", content: data.description },
  ];
};

export default function Index() {
  return (
    <TranslationProvider>
      <Outlet />
    </TranslationProvider>
  );
}

export const useAppConfig = () => {
  const matches = useMatches();

  const root = matches.find((match) => match.id === "routes/($lang)")?.data as
    | SerializeFrom<Awaited<ReturnType<typeof loader>>>
    | undefined;
  const { DEFAULT_LANGUAGE } = root ?? {
    DEFAULT_LANGUAGE: "en",
  };
  return { DEFAULT_LANGUAGE };
};
