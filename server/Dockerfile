FROM node:21.6.1 AS server

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start" ]
