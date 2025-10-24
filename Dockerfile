FROM node:20-alpine

WORKDIR /app

# Install system dependencies FIRST (python3 and canvas dependencies)
RUN apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    giflib-dev \
    libjpeg-turbo-dev \
    librsvg-dev

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Create necessary directories
RUN mkdir -p includes/public utils

# Expose port
EXPOSE 3000

# Start the bot
CMD ["node", "Kashif.js"]
