# --- Frontend Build Stage ---
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY electiq-app/package*.json ./
RUN npm install
COPY electiq-app/ ./
RUN npm run build

# --- Backend Build Stage ---
FROM node:20-slim AS backend-builder
WORKDIR /app/backend
COPY server/package*.json ./
RUN npm install
COPY server/ ./
RUN npm run build

# --- Production Stage ---
FROM node:20-slim
WORKDIR /app

# Copy backend dependencies and build
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev
COPY --from=backend-builder /app/backend/dist ./server/dist

# Copy frontend build to the location the backend expects
COPY --from=frontend-builder /app/frontend/dist ./electiq-app/dist

# Set working directory to backend to run the server
WORKDIR /app/server
EXPOSE 3001

# Start the server
CMD ["node", "dist/server.js"]
