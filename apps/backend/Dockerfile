FROM node:16
WORKDIR /app

COPY package.json .
COPY node_modules ./node_modules
COPY dist ./dist
COPY dockerrun.sh .

ENV HTTP_SERVER_PORT=80

EXPOSE 80

CMD ["./dockerrun.sh"]

# traefik.docker.network - Defines a default docker network to use for connections to all containers.
# traefik.enable - Makes this container enable for the resulting routing configuration.
LABEL traefik.docker.network=web \
    traefik.enable=true \
    traefik.port=80 \
    traefik.default.protocol=http
