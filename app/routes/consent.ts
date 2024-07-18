import { ActionFunctionArgs, json } from "@remix-run/node";
import { sessionService } from "~/domains/core/session.server";

export const action = async (args: ActionFunctionArgs) => {
  const formData = await args.request.formData();
  const entries = Object.fromEntries(formData) as Record<
    string,
    string | undefined
  >;

  const { headers } = await sessionService.consent.set(args.request.headers, {
    ad_personalization:
      entries.ad_personalization === "granted" ? "granted" : "denied",
    ad_storage: entries.ad_storage === "granted" ? "granted" : "denied",
    ad_user_data: entries.ad_user_data === "granted" ? "granted" : "denied",
    analytics_storage:
      entries.analytics_storage === "granted" ? "granted" : "denied",
  });

  return json({ success: true }, { headers });
};
