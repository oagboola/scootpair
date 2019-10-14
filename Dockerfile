
FROM node:latest

COPY . /var/www/app

# Set a working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY package.json /usr/src

RUN npm install

# Copy application files
COPY . .

RUN npm install -g nodemon

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
