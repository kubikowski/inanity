FROM node:fermium

RUN apt update \
 && apt install -y --no-install-recommends chromium \
 && rm -rf /var/lib/apt/lists/*

ENV CHROME_BIN=chromium
