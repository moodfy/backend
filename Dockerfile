FROM node:16-alpine
WORKDIR /usr/backend
COPY package.json .
RUN npm install \
    && npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./build/index.js"]