import { MetaFunction } from "@remix-run/node";

import { createTranslator } from "typed-locale";
import { getSafeLanguage, getTranslation } from "~/domains/i18n";
import Markdown from "../$lang.docs/mardown";
import { useTranslation } from "../$lang/route";
import { doc } from "./doc";

export const meta: MetaFunction = ({ params }) => {
  const lang = getSafeLanguage(params.lang);
  const t = createTranslator(getTranslation(lang));
  return [{ title: t((l) => l.footer.legal) }];
};

export default function Index() {
  const { lang } = useTranslation();
  const Doc = doc[lang];
  return (
    <Markdown>
      <Doc />
    </Markdown>
  );
}
