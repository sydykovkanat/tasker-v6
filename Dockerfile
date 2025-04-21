# FROM node:alpine
# RUN mkdir /App
# WORKDIR /App
# COPY package*.json ./
# RUN npm install
# COPY . /App
# CMD ["npm", "run", "dev"]

FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . /app

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "preview"]