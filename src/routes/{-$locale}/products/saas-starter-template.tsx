import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Database, Globe, Server, Smartphone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getTranslator } from "@/lib/i18n";
import { resolveLocaleForPath } from "@/lib/i18n/locale";
import { useI18n } from "@/lib/i18n/use-i18n";
import { buildSeo } from "@/lib/seo";
import { type WaitlistFormValues, waitlist } from "@/lib/waitlist";

export const Route = createFileRoute(
	"/{-$locale}/products/saas-starter-template",
)({
	loader: ({ location, serverContext }) => ({
		locale: resolveLocaleForPath(location.pathname, serverContext),
	}),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const t = getTranslator(loaderData.locale);
		return buildSeo({
			title: t((t) => t.products.saasStarter.seoTitle),
			description: t((t) => t.products.saasStarter.seoDescription),
			path: "/products/saas-starter-template",
			locale: loaderData.locale,
		});
	},
	component: SaasStarterTemplatePage,
});

const emailSchema = z.string().email();

function SaasStarterTemplatePage() {
	const { t } = useI18n();
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const heroHighlights = [
		{
			title: t((t) => t.products.saasStarter.hero.highlights.speed.title),
			description: t(
				(t) => t.products.saasStarter.hero.highlights.speed.description,
			),
		},
		{
			title: t((t) => t.products.saasStarter.hero.highlights.quality.title),
			description: t(
				(t) => t.products.saasStarter.hero.highlights.quality.description,
			),
		},
		{
			title: t((t) => t.products.saasStarter.hero.highlights.scale.title),
			description: t(
				(t) => t.products.saasStarter.hero.highlights.scale.description,
			),
		},
	];

	const heroBadges = [
		t((t) => t.products.saasStarter.hero.badges.auth),
		t((t) => t.products.saasStarter.hero.badges.sdk),
		t((t) => t.products.saasStarter.hero.badges.design),
	];

	const stackItems = [
		{
			icon: Globe,
			title: t((t) => t.products.saasStarter.stack.items.web.title),
			description: t((t) => t.products.saasStarter.stack.items.web.description),
		},
		{
			icon: Smartphone,
			title: t((t) => t.products.saasStarter.stack.items.mobile.title),
			description: t(
				(t) => t.products.saasStarter.stack.items.mobile.description,
			),
		},
		{
			icon: Server,
			title: t((t) => t.products.saasStarter.stack.items.api.title),
			description: t((t) => t.products.saasStarter.stack.items.api.description),
		},
		{
			icon: Database,
			title: t((t) => t.products.saasStarter.stack.items.data.title),
			description: t(
				(t) => t.products.saasStarter.stack.items.data.description,
			),
		},
	];

	const stackBadges = [
		t((t) => t.products.saasStarter.stack.badges.item1),
		t((t) => t.products.saasStarter.stack.badges.item2),
		t((t) => t.products.saasStarter.stack.badges.item3),
		t((t) => t.products.saasStarter.stack.badges.item4),
		t((t) => t.products.saasStarter.stack.badges.item5),
	];

	const qualityItems = [
		{
			title: t((t) => t.products.saasStarter.quality.items.typing.title),
			description: t(
				(t) => t.products.saasStarter.quality.items.typing.description,
			),
		},
		{
			title: t((t) => t.products.saasStarter.quality.items.lint.title),
			description: t(
				(t) => t.products.saasStarter.quality.items.lint.description,
			),
		},
		{
			title: t((t) => t.products.saasStarter.quality.items.agents.title),
			description: t(
				(t) => t.products.saasStarter.quality.items.agents.description,
			),
		},
	];

	const emailError = t((t) => t.products.saasStarter.waitlist.errors.email);

	const defaultValues: WaitlistFormValues = {
		email: "",
	};

	const form = useForm<
		WaitlistFormValues,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		undefined
	>({
		defaultValues,
		onSubmit: async ({ value, formApi }) => {
			setSubmitError(null);
			try {
				await waitlist.createWaitlistEntry({
					data: {
						...value,
					},
				});
				setSubmitSuccess(true);
				formApi.reset(defaultValues);
			} catch (error) {
				console.error(error);
				setSubmitError(t((t) => t.products.saasStarter.waitlist.errors.submit));
			}
		},
	});

	return (
		<div className="bg-[#f6f1ea] text-slate-900">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(246,241,234,0.92)_55%,rgba(246,241,234,1)_100%)]" />
				<div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
					<div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
						<div className="space-y-8">
							<span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.32em] text-slate-500">
								{t((t) => t.products.saasStarter.hero.eyebrow)}
							</span>
							<div className="space-y-5">
								<h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
									{t((t) => t.products.saasStarter.hero.title)}
								</h1>
								<p className="text-lg text-slate-600">
									{t((t) => t.products.saasStarter.hero.subtitle)}
								</p>
							</div>
							<div className="flex flex-wrap gap-4">
								<Button asChild>
									<a href="#waitlist" className="gap-2">
										{t((t) => t.products.saasStarter.hero.ctaPrimary)}
										<ArrowRight className="h-4 w-4" />
									</a>
								</Button>
								<Button variant="outline" asChild>
									<a href="#stack">
										{t((t) => t.products.saasStarter.hero.ctaSecondary)}
									</a>
								</Button>
							</div>
							<div className="flex flex-wrap gap-2 text-xs text-slate-500">
								{heroBadges.map((badge) => (
									<span
										key={badge}
										className="rounded-full border border-slate-200 bg-white/70 px-3 py-1"
									>
										{badge}
									</span>
								))}
							</div>
							<div className="grid gap-4 sm:grid-cols-3">
								{heroHighlights.map((item) => (
									<div
										key={item.title}
										className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm"
									>
										<p className="text-sm font-semibold text-slate-900">
											{item.title}
										</p>
										<p className="mt-2 text-sm text-slate-600">
											{item.description}
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="relative">
							<div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl backdrop-blur">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<img
											src="/icon-515x515.png"
											alt="Keystone Stack icon"
											className="h-10 w-10 rounded-xl border border-slate-200 bg-white shadow-sm"
										/>
										<p className="text-sm font-semibold text-slate-900">
											{t((t) => t.products.saasStarter.hero.preview.title)}
										</p>
									</div>
									<span className="text-xs text-slate-500">
										{t((t) => t.products.saasStarter.hero.preview.tag)}
									</span>
								</div>
								<div className="mt-6 grid gap-4 sm:grid-cols-2">
									{stackItems.slice(0, 4).map((item) => (
										<div
											key={item.title}
											className="rounded-2xl border border-slate-200/70 p-4"
										>
											<item.icon className="h-5 w-5 text-teal-600" />
											<p className="mt-3 text-sm font-semibold text-slate-900">
												{item.title}
											</p>
											<p className="text-xs text-slate-600">
												{item.description}
											</p>
										</div>
									))}
								</div>
								<div className="mt-6 flex flex-wrap gap-2">
									{stackBadges.map((badge) => (
										<span
											key={badge}
											className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
										>
											{badge}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="waitlist" className="pb-16 pt-6">
				<div className="mx-auto w-full max-w-3xl px-6 text-center">
					<h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
						{t((t) => t.products.saasStarter.waitlist.title)}
					</h2>
					<p className="mt-2 text-slate-600">
						{t((t) => t.products.saasStarter.waitlist.subtitle)}
					</p>

					{submitSuccess ? (
						<div className="mt-6">
							<p className="text-sm font-semibold text-emerald-700">
								{t((t) => t.products.saasStarter.waitlist.successTitle)}
							</p>
							<p className="mt-2 text-sm text-emerald-700">
								{t((t) => t.products.saasStarter.waitlist.successDescription)}
							</p>
						</div>
					) : (
						<form
							className="mt-6"
							onSubmit={(event) => {
								event.preventDefault();
								form.handleSubmit();
							}}
						>
							<form.Field
								name="email"
								validators={{
									onSubmit: ({ value }) =>
										emailSchema.safeParse(value).success
											? undefined
											: emailError,
								}}
							>
								{(field) => (
									<div className="mx-auto w-full max-w-md">
										<div className="flex items-center overflow-hidden rounded-md border border-slate-200 bg-white/60 shadow-sm focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-200/60">
											<Label htmlFor={field.name} className="sr-only">
												{t(
													(t) =>
														t.products.saasStarter.waitlist.form.emailLabel,
												)}
											</Label>
											<Input
												id={field.name}
												type="email"
												required
												value={field.state.value}
												onChange={(event) =>
													field.handleChange(event.target.value)
												}
												placeholder={t(
													(t) =>
														t.products.saasStarter.waitlist.form
															.emailPlaceholder,
												)}
												className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
											/>
											<form.Subscribe selector={(state) => state.isSubmitting}>
												{(isSubmitting) => (
													<Button
														type="submit"
														size="icon"
														aria-label={t(
															(t) =>
																t.products.saasStarter.waitlist.form.submit,
														)}
														disabled={isSubmitting}
														variant="ghost"
														className="h-11 w-11 rounded-none border-l border-slate-200 text-slate-700 hover:bg-white/70"
													>
														<ArrowRight className="h-4 w-4" />
													</Button>
												)}
											</form.Subscribe>
										</div>
										{field.state.meta.errors[0] ? (
											<p className="mt-2 text-xs text-rose-600">
												{field.state.meta.errors[0]}
											</p>
										) : null}
									</div>
								)}
							</form.Field>

							{submitError ? (
								<p className="mt-3 text-sm text-rose-600">{submitError}</p>
							) : null}
						</form>
					)}
				</div>
			</section>

			<section id="stack" className="py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
						<div className="space-y-4">
							<h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
								{t((t) => t.products.saasStarter.stack.title)}
							</h2>
							<p className="text-slate-600">
								{t((t) => t.products.saasStarter.stack.subtitle)}
							</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							{stackItems.map((item) => (
								<div
									key={item.title}
									className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm"
								>
									<div className="flex items-center gap-3">
										<span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
											<item.icon className="h-5 w-5" />
										</span>
										<p className="text-sm font-semibold text-slate-900">
											{item.title}
										</p>
									</div>
									<p className="mt-3 text-sm text-slate-600">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section id="quality" className="bg-white py-20">
				<div className="mx-auto w-full max-w-6xl px-6">
					<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="space-y-4">
							<h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
								{t((t) => t.products.saasStarter.quality.title)}
							</h2>
							<p className="text-slate-600">
								{t((t) => t.products.saasStarter.quality.subtitle)}
							</p>
						</div>
						<div className="grid gap-4">
							{qualityItems.map((item) => (
								<div
									key={item.title}
									className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
								>
									<p className="text-sm font-semibold text-slate-900">
										{item.title}
									</p>
									<p className="mt-2 text-sm text-slate-600">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
