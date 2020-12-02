FROM node:12.9.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Bundle app source code
COPY --chown=node . .

# && usermod -aG sudo node
USER node
EXPOSE 8005

CMD ["node" , "index.js"]

# docker build -t 172.16.204.72:5100/node-email:5.0 .
