FROM node:25.3.0 AS deps
WORKDIR /repo

COPY package.json yarn.lock ./
COPY apps/api/package.json apps/api/package.json
RUN yarn install --frozen-lockfile

FROM node:25.3.0 AS build
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY . .

RUN yarn workspace api build

RUN test -f apps/api/dist/main.js -o -f apps/api/dist/src/main.js

FROM node:25.3.0 AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/apps/api/package.json ./apps/api/package.json
COPY --from=build /repo/apps/api/dist ./apps/api/dist

EXPOSE 3001

CMD ["sh", "-c", "node apps/api/dist/main.js || node apps/api/dist/src/main.js"]
