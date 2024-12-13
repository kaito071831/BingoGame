FROM node:18-slim
WORKDIR /bingo_app
RUN yarn

EXPOSE 3000