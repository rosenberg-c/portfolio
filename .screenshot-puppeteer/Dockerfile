FROM node:22-alpine

RUN apk add --no-cache \
    chromium \
    ca-certificates \
    font-freefont

WORKDIR /app

RUN npm install --omit=dev puppeteer-core \
    && npm cache clean --force

ENV CHROME_PATH=/usr/bin/chromium-browser

COPY screenshot.mjs .

USER node

WORKDIR /output

ENTRYPOINT ["node", "/app/screenshot.mjs"]