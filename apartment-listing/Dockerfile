# Use official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the TypeScript code into JavaScript (compiled in the dist/ directory)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the NestJS application in production mode
CMD ["npm", "run", "start:prod"]
