FROM --platform=amd64 ubuntu:20.04
SHELL ["/bin/bash", "-c"]
WORKDIR /app
COPY --from=node:18-slim /usr/local/bin /usr/local/bin
COPY --from=node:18-slim /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
