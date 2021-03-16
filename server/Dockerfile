FROM node:12.18.1-alpine

# Env
ENV ENV_NAME=dev
ENV NODE_ENV=dev
ENV NODE_CONFIG_ENV=dev

# Create directory for the container
# RUN mkdir /server/src/app
RUN mkdir -p /server/src/app

WORKDIR /server/src/app
ENV PATH /server/src/app/node_modules/.bin:$PATH
# Copy package.json file to work directory

#Additionnal
# RUN apt-get update

COPY package.json .
# COPY package.json /server/src/app/package.json
# WORKDIR /server/src/app
# Install npm packages
RUN npm install

# Copy all other source code to work directory

ADD . /server/src/app

# Typescript build

# RUN tsc
RUN npm run build
# RUN npx run tsc

EXPOSE 4001
# Start
# CMD ["npm", "run", "start:watch"]
CMD ["npm", "run", "start"]