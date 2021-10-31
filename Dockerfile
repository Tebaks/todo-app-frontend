FROM node:14.17.5

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

CMD ["yarn", "start"]
