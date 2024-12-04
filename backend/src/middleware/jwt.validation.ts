require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  const secret = config.get<String>("jwtSecret");

  try {
    //@ts-ignore
    jwt.verify(token, secret);
    const dataUser = jwt.decode(token);
    req.body.jwt = dataUser;
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: "Sua sessão é invalida" });
  }
};
