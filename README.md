# Setup Server

1. `npm i --save-dev express nodemon prisma dotenv typescript ts-node @types/node @types/express concurrently @prisma/client`
2. Set the DATABASE_URL in the .env file, and set the provider to `mongodb`
3. `npx prisma db push`
4. `npx prisma generate`
5. `npm i --save-dev bcryptjs jsonwebtoken` use in auth
