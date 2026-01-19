FROM node:25.3.0 AS deps
WORKDIR /repo

COPY package.json yarn.lock ./
COPY apps/web/package.json apps/web/package.json
RUN yarn install --frozen-lockfile

FROM node:25.3.0 AS build
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

ENV NEXT_DISABLE_TURBOPACK=1
RUN yarn workspace web build

FROM node:25.3.0 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /repo/package.json ./package.json
COPY --from=build /repo/yarn.lock ./yarn.lock
COPY --from=build /repo/node_modules ./node_modules

COPY --from=build /repo/apps/web/package.json ./apps/web/package.json
COPY --from=build /repo/apps/web/.next ./apps/web/.next
COPY --from=build /repo/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["yarn", "workspace", "web", "start", "-p", "3000"]
