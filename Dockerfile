# ---- build ----
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ---- runtime ----
FROM oven/bun:1 AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
COPY --from=build /app/.next        ./.next
COPY --from=build /app/public       ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
USER bun
EXPOSE 3000
CMD ["bun", "run", "start"]
