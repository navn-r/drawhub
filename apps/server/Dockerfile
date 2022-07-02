# Depends on: root /Dockerfile base image
FROM drawhub/base:latest AS builder

# Production Build
WORKDIR /app/builder
COPY . /app/builder
RUN npx nx run server:build:production

# Multi stage build step
# Use base image again
FROM drawhub/base:latest 

WORKDIR /app
ENV NODE_ENV production

# Copy over production code
# Need whole directory, or else `Error: Cannot find module 'tslib'` 
COPY --from=builder /app/builder /app/

# Run server on creation of container
CMD [ "node", "./dist/apps/server/main.js" ]
