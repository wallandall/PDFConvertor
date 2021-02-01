FROM node:15.5-alpine

EXPOSE 5000
ENV NODE_ENV=production

#RUN apk update
#RUN apk add --no-cache fontconfig curl
#RUN mkdir -p /usr/share
#RUN mkdir -p /usr/share
#RUN cd /usr/share
#RUN curl -L https://github.com/Overbryd/docker-phantomjs-alpine/releases/download/2.11/phantomjs-alpine-x86_64.tar.bz2 | tar xj
#RUN ln -s /usr/share/phantomjs/phantomjs /usr/bin/phantomjs




ENV PHANTOMJS_VERSION=2.1.1
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN apk update && apk add --no-cache fontconfig curl curl-dev && \
    cd /tmp && curl -Ls https://github.com/dustinblackman/phantomized/releases/download/${PHANTOMJS_VERSION}/dockerized-phantomjs.tar.gz | tar xz && \
    cp -R lib lib64 / && \
    cp -R usr/lib/x86_64-linux-gnu /usr/lib && \
    cp -R usr/share /usr/share && \
    cp -R etc/fonts /etc && \
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2 | tar -jxf - && \
    cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs


#############################
RUN apk add --no-cache tini
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force

COPY . .
ENTRYPOINT ["tini", "--"]

CMD ["npm", "start"]

#To build this container run:
## docker build -t pdf-creator .
#To Run type :
##docker run -p 80:5000 pdf-creatorclear
