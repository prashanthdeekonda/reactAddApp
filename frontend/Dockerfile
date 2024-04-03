FROM node:21.6.1 AS frontend

WORKDIR /app

COPY package.json .

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
