
# DEVELOPMENT

FROM node:16.14.2-alpine3.15 As development

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY --chown=node:node package*.json ./
COPY package.json /usr/src/app/package.json 

RUN npm i

RUN npm ci

COPY --chown=node:node . .

USER node

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
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]