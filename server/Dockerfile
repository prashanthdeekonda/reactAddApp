FROM node:21.7.1 AS server

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start" ]
