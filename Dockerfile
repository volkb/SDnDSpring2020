FROM node:lts

WORKDIR /var/www/app #changed to /var/www to account for variable size of files

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start"]
