# Depends on: root /Dockerfile base image
FROM drawhub/base:latest AS builder

# Production Build
WORKDIR /app/builder
COPY . /app/builder
RUN npx nx run client:build:production

# Multi-stage build step
# Use Nginx image for serving static
FROM nginx:1.23.0-alpine

WORKDIR /usr/share/nginx/html

# Copy production bundle into nginx
COPY --from=builder /app/builder/dist/apps/client /usr/share/nginx/html/

# Copy nginx config file
COPY --from=builder /app/builder/apps/client/nginx.conf /etc/nginx/nginx.conf
