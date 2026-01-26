# syntax=docker/dockerfile:1

FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
WORKDIR /app
ARG VITE_POSTHOG_KEY
ARG VITE_POSTHOG_HOST
ARG POSTHOG_CLI_HOST
ARG POSTHOG_CLI_ENV_ID
ARG POSTHOG_CLI_TOKEN
ARG POSTHOG_SOURCEMAP_PROJECT
ARG POSTHOG_SOURCEMAP_VERSION
ENV VITE_POSTHOG_KEY=$VITE_POSTHOG_KEY
ENV VITE_POSTHOG_HOST=$VITE_POSTHOG_HOST
ENV POSTHOG_CLI_HOST=$POSTHOG_CLI_HOST
ENV POSTHOG_CLI_ENV_ID=$POSTHOG_CLI_ENV_ID
ENV POSTHOG_CLI_TOKEN=$POSTHOG_CLI_TOKEN
COPY . .
RUN bun run build
RUN set -e; \
	if [ -n "$POSTHOG_CLI_TOKEN" ] && [ -n "$POSTHOG_CLI_ENV_ID" ]; then \
		PROJECT_ARG=""; \
		if [ -n "$POSTHOG_SOURCEMAP_PROJECT" ]; then \
			PROJECT_ARG="--project $POSTHOG_SOURCEMAP_PROJECT"; \
		fi; \
		VERSION_ARG=""; \
		if [ -n "$POSTHOG_SOURCEMAP_VERSION" ]; then \
			VERSION_ARG="--version $POSTHOG_SOURCEMAP_VERSION"; \
		fi; \
		bunx @posthog/cli sourcemap inject --directory ./.output/public $PROJECT_ARG $VERSION_ARG; \
		bunx @posthog/cli sourcemap upload --directory ./.output/public --delete-after; \
	else \
		echo "Skipping PostHog sourcemap upload (missing POSTHOG_CLI_TOKEN or POSTHOG_CLI_ENV_ID)"; \
	fi

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]
