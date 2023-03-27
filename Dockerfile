FROM node:14.18

RUN apt-get update -y 
RUN apt-get install -y g++ make python
RUN apt-get install -y  openssl

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
