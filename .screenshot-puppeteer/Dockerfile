#FROM node:22-alpine
FROM node:26.13.1-trixie@sha256:f8e5d4bb28fa55c74f1345166a082a10b7c68f22304350c1ce0d18358ae94996

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates \
    fonts-freefont-ttf \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN npm install --omit=dev puppeteer-core \
    && npm cache clean --force

ENV CHROME_PATH=/usr/bin/chromium

COPY screenshot.mjs .

USER node

WORKDIR /output

ENTRYPOINT ["node", "/app/screenshot.mjs"]