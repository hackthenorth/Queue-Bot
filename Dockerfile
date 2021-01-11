FROM node:12.16.3

WORKDIR /srv/hackerapi

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 80
CMD [ "npm", "run", "dev" ]