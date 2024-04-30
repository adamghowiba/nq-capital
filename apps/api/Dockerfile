FROM public.ecr.aws/docker/library/node:18.14.0 as builder

WORKDIR /app

ENV NX_DAEMON=false

# COPY & INSTALL PACKGES
COPY ./package*.json ./
RUN npm install

COPY ./tsconfig.base.json ./
COPY ./nx.json ./
COPY ./prisma ./prisma
COPY /apps/api ./apps/api

# COPY REQUIRED PACKAGES
COPY /libs ./libs

# BUILD
RUN npx prisma generate

# TODO unable to get DATABSE_URL
# RUN npx prisma migrate deploy

# RUN npx prisma migrate deploy
RUN npx nx build --project=api --configuration=production
COPY ./prisma ./dist/apps/api

# PRODUCTION STAGE
FROM public.ecr.aws/docker/library/node:18.14.0-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

RUN npm --prefix ./dist/apps/api --omit=dev --force install
RUN (cd ./dist/apps/api && npx prisma generate)

EXPOSE 5010

CMD ["node", "dist/apps/api/main.js"]
