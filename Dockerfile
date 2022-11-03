FROM node:alpine
WORKDIR /app
COPY . /app

RUN npm install  

CMD /app/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck
