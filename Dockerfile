# Stage 1: Build Stage
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm install --only=production

# Install development dependencies for building the application
RUN npm install @nestjs/cli typescript --global

# Copy the rest of the application code
COPY . .

# Build the application
RUN npx prisma generate
RUN npm run build


# Remove dev dependencies
RUN npm prune --production


# Stage 2: Production Stage
FROM node:22-alpine3.20


# Set the working directory
WORKDIR /app

# Copy the production dependencies and built application from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist


# Expose the port the application will run on
EXPOSE 4000

# Define the default command
CMD ["node", "dist/main"]
