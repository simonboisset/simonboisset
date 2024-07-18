import { createCookieSessionStorage, redirect } from "@remix-run/node";
import z, { ZodType } from "zod";
import { languageSchema } from "../i18n";
import { env } from "./env.server";

type SessionName = "__session" | "theme" | "language" | "gtm_consent";

type createSessionServiceParams = {
  name: SessionName;
  maxAge?: number;
};

const createSessionService = <O>(
  { name, maxAge }: createSessionServiceParams,
  schema: ZodType<O>
) => {
  const store = createCookieSessionStorage({
    cookie: {
      name,
      httpOnly: true,
      maxAge,
      path: "/",
      sameSite: "lax",
      secrets: [env.SESSION_SECRET],
      secure: env.NODE_ENV === "production",
    },
  });
  const get = async (headers: Headers) => {
    const cookie = headers.get("Cookie");
    const session = await store.getSession(cookie);
    const sessionValue = session.get(name);

    const validatedSessionObject = schema.safeParse(sessionValue);
    if (!validatedSessionObject.success) {
      return null;
    }

    return validatedSessionObject.data;
  };

  const require = async (headers: Headers, redirectTo?: string) => {
    const token = await get(headers);
    if (!token) {
      throw redirect(redirectTo || "/");
    }

    return token;
  };

  const requireTokenNull = async (headers: Headers, redirectTo?: string) => {
    const token = await get(headers);

    if (token) {
      throw redirect(redirectTo || "/");
    }
    return null;
  };

  const set = async (headers: Headers, value: O) => {
    const cookie = headers.get("Cookie");

    const validatedSessionObject = schema.parse(value);
    const session = await store.getSession(cookie);

    session.set(name, validatedSessionObject);
    const nextHeaders = new Headers({
      "Set-Cookie": await store.commitSession(session),
    });
    return { headers: nextHeaders };
  };

  const remove = async (headers: Headers) => {
    const cookie = headers.get("Cookie");
    const session = await store.getSession(cookie);
    const nextHeaders = new Headers({
      "Set-Cookie": await store.destroySession(session),
    });
    return { headers: nextHeaders };
  };

  const flash = async (headers: Headers, value: O) => {
    const cookie = headers.get("Cookie");
    const session = await store.getSession(cookie);
    const validatedSessionObject = schema.parse(value);

    session.flash(name, validatedSessionObject);
    const nextHeaders = new Headers({
      "Set-Cookie": await store.commitSession(session),
    });
    return { headers: nextHeaders };
  };

  const getFlash = async (headers: Headers) => {
    const cookie = headers.get("Cookie");
    const session = await store.getSession(cookie);

    const sessionObject = session.get(name);

    const validatedSessionObject = schema.safeParse(sessionObject);
    const flashheaders = new Headers({
      "Set-Cookie": await store.commitSession(session),
    });
    if (!validatedSessionObject.success) {
      return { flash: null, headers: flashheaders };
    }

    return { flash: validatedSessionObject.data, headers: flashheaders };
  };

  return { get, require, set, requireTokenNull, remove, flash, getFlash };
};

export const themeShema = z.enum(["light", "dark"]);
export type Theme = z.infer<typeof themeShema>;

export const gtmConsentSchema = z.object({
  ad_personalization: z.enum(["granted", "denied"]),
  ad_storage: z.enum(["granted", "denied"]),
  ad_user_data: z.enum(["granted", "denied"]),
  analytics_storage: z.enum(["granted", "denied"]),
});

export const sessionService = {
  auth: createSessionService(
    { name: "__session", maxAge: 60 * 60 * 24 * 30 },
    z.object({ token: z.string() })
  ),
  language: createSessionService(
    { name: "language" },
    z.object({ lang: languageSchema })
  ),
  theme: createSessionService(
    { name: "theme" },
    z.object({ theme: themeShema })
  ),
  consent: createSessionService(
    { name: "gtm_consent", maxAge: 60 * 60 * 24 * 360 },
    gtmConsentSchema
  ),
};
