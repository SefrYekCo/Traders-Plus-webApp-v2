# -------- Base Image (Node 14.19.3) --------
FROM node:14.19.3 AS builder

# Create working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build Next.js project
RUN npm run build


# -------- Production Image --------
FROM node:14.19.3 AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app ./

# Expose the port (3001 in your scripts)
EXPOSE 3001

# Run Next.js in production mode
CMD ["npm", "start"]

