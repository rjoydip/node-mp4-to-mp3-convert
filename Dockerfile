FROM node:12-alpine3.14 as node

COPY . /tmp/app
WORKDIR /tmp/app

RUN apk add ffmpeg && mkdir temp && npm install

CMD [ "npm", "start" ]