# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory to the app directory
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Start the React application when the container launches
CMD ["npm", "start"]