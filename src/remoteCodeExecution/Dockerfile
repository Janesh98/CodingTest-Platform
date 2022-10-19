FROM node:14

RUN apt-get update -y \
    && apt-get -y install openjdk-11-jdk-headless \
    && apt-get -y install python3 \
    && apt-get -y install time \
    && apt-get clean -y

COPY package*.json ./
RUN npm install --only=production

COPY /config /config/
COPY /controllers /controllers/
COPY /routes /routes/
COPY /services /services
COPY /utils /utils/
COPY app.js ./
COPY server.js ./
COPY worker.js ./

COPY entrypoint.sh /entrypoint.sh

CMD ["/bin/sh", "entrypoint.sh"]
