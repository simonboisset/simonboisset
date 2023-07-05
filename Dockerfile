FROM node:16-bullseye-slim as base
RUN apt-get update && apt-get install -y openssl

FROM base as deps
RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install --production=false

FROM base as production-deps
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json yarn.lock ./
RUN yarn install --production=true

FROM base as build
ENV NODE_ENV=production
RUN mkdir /app
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN yarn build

FROM base
ENV NODE_ENV=production
ENV PORT=8080
RUN mkdir /app
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .
CMD ["yarn", "start"]