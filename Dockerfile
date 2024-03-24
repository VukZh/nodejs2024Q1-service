FROM node:20.11-alpine AS development
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --only=development
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20.11-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /app/dist ./dist
COPY --chown=node:node --from=development /app/node_modules/.prisma/client  ./node_modules/.prisma/client
EXPOSE 4000
CMD ["node", "dist/main"]
