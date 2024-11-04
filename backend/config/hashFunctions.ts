//.ENV
require("dotenv").config()
import config from "config";

import { hash, compare, genSaltSync } from "bcrypt"

const saltRound = config.get<number>("salt")
const salt = genSaltSync(saltRound)

export async function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

export async function comparePassword(senha: string, hash: string): Promise<boolean> {
    try {
        const result = await compare(senha, hash);
        return result;
    } catch (error) {
        return false;
    }
}