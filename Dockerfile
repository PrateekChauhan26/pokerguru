# Minimal NestJS Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port (change to your app port if needed)
EXPOSE 8000

# Start the app
CMD ["node", "dist/main"]