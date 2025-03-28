FROM node:20-alpine
# Set the working directory in the container to /app
WORKDIR /app
# Copy package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install
# Install production dependencies only
RUN npm install --only=production
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Set environment variables for production
ENV NODE_ENV=production
# Expose the port the app runs on
EXPOSE 3000
CMD ["npm", "run", "start:prod"]