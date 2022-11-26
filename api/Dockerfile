FROM node:16.14-alpine

WORKDIR /usr

ARG HOST
ARG DATABASE_URL
ARG JWT_SECRET
ARG NODEMAILER_EMAIL
ARG NODEMAILER_EMAIL_PASS

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16.14-alpine
WORKDIR /usr

COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g

EXPOSE 3030

CMD ["pm2-runtime","index.js"]