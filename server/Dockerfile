FROM node:19.5.0-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start" ]
