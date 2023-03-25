FROM node:18-alpine
WORKDIR /app/account
COPY package*.json ./
# COPY .npmrc ./
RUN npm install
COPY . ./
ENTRYPOINT npm start