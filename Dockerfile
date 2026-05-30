FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json .
RUN npm ci --production

# Copy the rest of the code
COPY . .

# Build the front‑end (optional – you can serve static files from the same container)
RUN npm run build

# Expose the port (Vercel will set PORT env var automatically; default 5000)
EXPOSE 5000

# Start the Express server
CMD ["npm", "run", "server"]
