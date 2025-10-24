FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Create necessary directories if they don't exist
RUN mkdir -p includes/public utils

# Install system dependencies for canvas and other native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo \
    pango \
    giflib \
    libjpeg-turbo \
    librsvg

# Expose port
EXPOSE 3000

# Start the bot
CMD ["node", "Kashif.js"]
