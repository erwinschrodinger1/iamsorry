FROM node:lts-bullseye-slim

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
