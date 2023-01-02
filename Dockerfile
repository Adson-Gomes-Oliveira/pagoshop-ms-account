FROM node:16.4-alpine
WORKDIR /app/account
COPY package*.json .
RUN npm install
COPY . .
ENTRYPOINT npm start