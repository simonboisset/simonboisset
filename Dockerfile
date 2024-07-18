FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm i --prod

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=installer /app/build/ ./build
COPY --from=depender /app/node_modules/ ./node_modules
COPY --from=depender /app/package.json ./package.json

CMD ["pnpm", "start"]