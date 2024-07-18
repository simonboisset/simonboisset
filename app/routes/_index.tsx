import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { sessionService } from "~/domains/core/session.server";
import { languageSchema } from "~/domains/i18n";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const localeFromCookie = await sessionService.language.get(request.headers);

  const defaultLocaleValidated = languageSchema.safeParse(
    request.headers.get("Accept-Language")?.split(",")[0].split("-")[0]
  );

  const locale =
    localeFromCookie?.lang ||
    (defaultLocaleValidated.success && defaultLocaleValidated.data) ||
    "en";

  throw redirect(`/${locale}`, { status: 301 });
};
