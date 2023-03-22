
# DEVELOPMENT
FROM node:16.14.2-alpine3.15 As development

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

FROM nginx:1.19.10

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder ./ng-app/cert.pem /etc/ssl/certs/cert.pem
COPY --from=builder ./ng-app/key.pem /etc/ssl/private/key.pem

COPY --from=builder ./ng-app/default.conf /etc/nginx/conf.d/default.conf

# COPY --chown=node:node . .
RUN chown -R node.node /usr/src/app
COPY . .

CMD ["npm", "run", "start"]

# BUILD FOR PRODUCTION

FROM node:16.14.2-alpine3.15 As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

# PRODUCTION

FROM node:16.14.2-alpine3.15 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]
