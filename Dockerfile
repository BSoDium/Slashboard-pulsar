FROM node:16

ENV PORT 6033

WORKDIR /app/slashboard-pulsar

# Copy all files from cwd into /app/slashboard-pulsar
COPY . .

# Install frozen dependencies for repeatable builds and copy init.sh to root
RUN npm ci && cp ./scripts/docker_init.sh /init.sh && chmod +x /init.sh

EXPOSE 6033

# Run at startup using the /init.sh script
ENTRYPOINT ["/init.sh"]