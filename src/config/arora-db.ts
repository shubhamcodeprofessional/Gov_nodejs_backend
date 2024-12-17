// import dotenv from 'dotenv';
// import path from 'path';

// const envFile = path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV || 'prod'}`);
// dotenv.config({ path: envFile });

// export const config = {
//   database: {
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     user: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//   },
// };

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};
