FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript code
RUN npx tsc

# Expose API port
EXPOSE 5000

# Start server
CMD ["node", "dist/server.js"]
