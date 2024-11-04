import dotenv from 'dotenv';
dotenv.config();

const env = process.env.ENV
const port = process.env.PORT
const salt = process.env.SALT
const dburl = process.env.DBURL
const jwtSecret = process.env.JWT_SECRET

export default {
    port: port,
    env: env,
    salt: Number(salt),
    dbUri: dburl,
    jwtSecret: jwtSecret,
}