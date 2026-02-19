FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# Set working directory
WORKDIR /app
# Install turbo globally
RUN npm install -g turbo
COPY . .
# Prune the workspace for the web app
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Build the project
RUN npx turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

# Prepare production image
COPY --from=installer /app .

# Expose the Web port
EXPOSE 3000

# Start the application
CMD ["pnpm", "--filter", "web", "run", "start"]
