import { Router, Request, Response, NextFunction } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
  login,
} from "./controller/user.controller";
import {
  createUserValidation,
  editUserValidation,
} from "./middleware/user.validation";
import { validate } from "./middleware/handle.validation";
import { validateJWT } from "./middleware/jwt.validation";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working");
  })
  .post("/usuarios", createUserValidation(), validate, createUser)
  .get("/usuarios", validateJWT, validate, getUsers)
  .get("/usuarios/:email", validateJWT, validate, getUser)
  .put(
    "/usuarios/:email",
    validateJWT,
    editUserValidation(),
    validate,
    editUser
  )
  .delete("/usuarios/:email", validateJWT, validate, deleteUser)
  // login e logout
  .post("/login", validate, login);
