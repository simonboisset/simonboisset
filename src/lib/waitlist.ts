import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { env } from "@/env";
export const waitlistFormSchema = z.object({
	email: z.string().email(),
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

const createWaitlistEntry = createServerFn({ method: "POST" })
	.inputValidator(waitlistFormSchema)
	.handler(async ({ data }) => {
		const response = await fetch(
			`${env.DIRECTUS_URL}/items/waiting_list_entries`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${env.DIRECTUS_WAITLIST_TOKEN}`,
				},
				body: JSON.stringify({
					applicationId: env.KEYSTONE_APPLICATION_ID,
					email: data.email,
				}),
			},
		);

		if (!response.ok) {
			const errorBody = await response.text();
			console.error("Waitlist API error", response.status, errorBody);
			throw new Error("WAITLIST_SUBMISSION_FAILED");
		}

		return { ok: true };
	});

export const waitlist = {
	createWaitlistEntry,
};
