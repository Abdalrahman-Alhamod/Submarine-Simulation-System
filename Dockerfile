# Use an official Node.js runtime as a parent image
FROM node:20.17.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port that the server will run on
EXPOSE 8084

# Start the application
CMD ["npm", "run", "dev"]
