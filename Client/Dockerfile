FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build arguments
ARG VITE_API_BASE=http://localhost:5000
ARG VITE_DEBUG=false

# Make available to Vite build
ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_DEBUG=$VITE_DEBUG

COPY frontend/ .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf.template

EXPOSE 80

CMD ["/bin/sh", "-c", "echo PORT=$PORT && envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]