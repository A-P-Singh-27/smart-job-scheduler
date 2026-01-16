FROM node:22-bullseye

WORKDIR /app

COPY package.json ./

RUN npm cache clean --force \
 && npm install --include=optional

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
