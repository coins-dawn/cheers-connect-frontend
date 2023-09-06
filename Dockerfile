FROM node:lts-buster-slim
WORKDIR /code
COPY package.json ./
COPY package-lock.json ./
RUN npm install
CMD npm run dev