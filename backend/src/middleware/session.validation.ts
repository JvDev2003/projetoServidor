import { header } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

export const sessionValidation = (admin: undefined | true = undefined) => {
  return [
    header("authorization").custom((value: string, { req }) => {
      const token = value.split(" ")[1];
      const secret = config.get<string>("jwtSecret");

      if (!token) {
        throw new Error("Seu token não é valido");
      }

      if (!jwt.verify(token, secret)) {
        throw new Error("Seu token não é valido");
      }

      try {
        const decoded = jwt.decode(token);

        //@ts-ignore
        if (admin && !decoded.admin!) {
          throw new Error(
            "Você não tem permissão suficiente para performar esta ação"
          );
        }

        req.body.jwt = decoded;
        return true;
      } catch (error) {
        throw new Error("Seu token não é valido");
      }
    }),
  ];
};
