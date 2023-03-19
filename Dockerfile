FROM node:18-alpine

MAINTAINER Obabko Oleksii

RUN mkdir /app
WORKDIR /app

COPY ./api/package.json /app

RUN npm i
