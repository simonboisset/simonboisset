const getAppUrlWithLanguage = ({
  lang,
  DEFAULT_LANGUAGE,
}: {
  lang?: string;
  DEFAULT_LANGUAGE: string;
}) => {
  if (lang === DEFAULT_LANGUAGE || !lang) {
    return ``;
  }
  return `/${lang}`;
};

const getAppUrlWithVersion = ({
  type,
  lang,
  DEFAULT_LANGUAGE,
  slug,
}: {
  type?: "docs" | "blog";
  lang?: string;
  DEFAULT_LANGUAGE: string;
  slug?: string;
}) => {
  const urlWithLanguage = getAppUrlWithLanguage({ lang, DEFAULT_LANGUAGE });
  if (!type) {
    return urlWithLanguage || "/";
  }

  return slug ? `${urlWithLanguage}/blog/${slug}` : `${urlWithLanguage}/blog`;
};

export const getAppUrl = ({
  type,
  lang,
  slug,
  DEFAULT_LANGUAGE,
}: {
  type?: "blog";
  lang?: string;
  slug?: string;
  DEFAULT_LANGUAGE: string;
}) => {
  const urlWithVersion = getAppUrlWithVersion({
    type,
    lang,
    DEFAULT_LANGUAGE,
    slug,
  });
  if (!type || type === "blog") {
    return urlWithVersion;
  }

  if (slug) {
    return `${urlWithVersion}/${slug}`;
  }

  return urlWithVersion;
};
