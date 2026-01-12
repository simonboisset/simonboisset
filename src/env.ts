import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DIRECTUS_URL: z.string().url(),
		DIRECTUS_APPLICATION_ID: z.string(),
	},
	clientPrefix: "VITE_",
	client: {
		VITE_POSTHOG_KEY: z.string().min(1).optional(),
		VITE_POSTHOG_HOST: z.string().url().optional(),
	},
	runtimeEnv: {
		...import.meta.env,
		...process.env,
	},
	emptyStringAsUndefined: true,
});
