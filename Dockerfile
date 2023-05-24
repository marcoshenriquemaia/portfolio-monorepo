FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm i -g --unsafe-perm @nestjs/cli

EXPOSE 3003
