FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./
COPY prisma ./prisma

RUN npm install --only=production

RUN npm install @nestjs/cli typescript --global

COPY . .

RUN npx prisma generate
RUN npm run build

RUN npm prune --production

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/

EXPOSE 4000

CMD ["npm", "run", "start:migrate:prod"]
