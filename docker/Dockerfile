# FROM node:latest as builder
# WORKDIR /usr/src/app
# ENV REACT_APP_NODE_ENV desauto
# COPY ["package.json", "package-lock.json*", "./"]
# # RUN npm config set registry https://registry.npm.taobao.org
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx:latest
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY docker/nginx.conf /etc/nginx/
WORKDIR /usr/share/nginx/html/
COPY ./build  .