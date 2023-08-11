FROM node:18-alpine

WORKDIR /home/webapps/rest-api-app

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "run", "start:dev" ]