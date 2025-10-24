# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package.json files first
COPY package*.json ./

# Install NPM dependencies
RUN npm install

# Copy all other files (bot code, index.js, etc.)
COPY . .

# Start the bot
CMD ["node", "index.js"]
