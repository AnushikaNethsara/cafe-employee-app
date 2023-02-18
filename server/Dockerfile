# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle the app source code inside the Docker image
COPY . .

# Expose the port that the app is running on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
