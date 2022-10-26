FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package.json .
RUN npm install -g npm@8.19.2 && npm install
COPY . .
CMD ["npm", "start"]
