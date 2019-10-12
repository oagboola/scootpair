
FROM node:latest

COPY . /var/www/app

WORKDIR /var/www/app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
