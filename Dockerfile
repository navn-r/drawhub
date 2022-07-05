# base image used by all apps
FROM node:16.15.1-alpine3.16 AS builder

WORKDIR /app/builder

# Only copy dependencies - Source files aren't necessary
COPY package*.json /app/builder/

RUN npm i