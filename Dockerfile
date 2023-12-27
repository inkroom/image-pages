FROM node:14.21.2
RUN sed -i "s@http://deb.debian.org@https://mirrors.huaweicloud.com@g" /etc/apt/sources.list && sed -i "s@http://security.debian.org@https://mirrors.huaweicloud.com@g" /etc/apt/sources.list && apt update -y && apt install -y git python
ENV LANG "C.UTF-8"
WORkDIR /app
COPY . /app
RUN  npm --registry https://registry.npmmirror.com/ i && npm --registry https://registry.npmmirror.com/ i -g serve
RUN npm run build
