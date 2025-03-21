# Use official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# ------------------------------
# Production stage
# ------------------------------
FROM node:18-alpine AS runner

# Set working directory inside the container
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
