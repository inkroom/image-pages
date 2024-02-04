FROM node:18.17.0
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources && apt update -y && apt install -y git
ENV LANG "C.UTF-8"
WORkDIR /app
COPY . /app
RUN  npm --registry https://registry.npmmirror.com/ i && npm --registry https://registry.npmmirror.com/ i -g serve
RUN rm -rf docs && npm run build || (test -f docs/index.html || exit 127 )