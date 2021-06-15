FROM node:16-alpine3.11
RUN apk add --no-cache git
RUN mkdir app \
    && cd app \
    && git clone https://github.com/B-Schwarz/Data-Teleporter.git . \
    && git checkout release/docker \
    && git pull \
    && npm install
WORKDIR app
EXPOSE 80:3000
CMD ["node", "index.js"]

