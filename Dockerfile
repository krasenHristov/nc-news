FROM node:16.20.2

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "./dist/listen.js"]
