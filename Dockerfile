FROM node:16-buster-slim

WORKDIR /app

RUN chown node:node -R /app
USER node
# Install app dependencies
COPY --chown=node package*.json ./
RUN npm install --production

# Bundle app source code
COPY --chown=node . .

EXPOSE 8005

CMD ["node" , "index.js"]

# docker build -t migutak/node-email:4.4 .
