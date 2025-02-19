import { Router, Request, Response, NextFunction } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
  login,
  logout,
} from "./controller/user.controller";
import {
  createUserValidation,
  editUserValidation,
  loginValidation,
} from "./middleware/user.validation";
import { validate } from "./middleware/handle.validation";
import { validateJWT } from "./middleware/jwt.validation";
import {
  createCategoria,
  deleteCategoria,
  getCategoria,
  getCategorias,
  updateCategoria,
} from "./controller/categoria.controller";
import { categoriaValidation } from "./middleware/categoria.validation";
import { sessionValidation } from "./middleware/session.validation";
import {
  createAviso,
  deleteAviso,
  getAvisos,
  updateAviso,
} from "./controller/aviso.controller";
import { avisosValidation } from "./middleware/avisos.validate";

const router = Router();

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working");
  })

  //usuarios
  .post("/usuarios", createUserValidation(), validate, createUser)
  .get("/usuarios", sessionValidation(true), validate, getUsers)
  .get("/usuarios/:email", sessionValidation(), validate, getUser)
  .put(
    "/usuarios/:email",
    sessionValidation(),
    editUserValidation(),
    validate,
    editUser
  )
  .delete(
    "/usuarios/:email",
    sessionValidation(true),
    validateJWT,
    validate,
    deleteUser
  )

  //categorias
  .post(
    "/categorias",
    sessionValidation(true),
    categoriaValidation(),
    validate,
    createCategoria
  )
  .get("/categorias", sessionValidation(), validate, getCategorias)
  .get("/categorias/:id", sessionValidation(true), validate, getCategoria)
  .put(
    "/categorias/:id",
    sessionValidation(true),
    categoriaValidation(),
    validate,
    updateCategoria
  )
  .delete("/categorias/:id", sessionValidation(true), validate, deleteCategoria)

  //avisos
  .post(
    "/avisos/",
    sessionValidation(true),
    avisosValidation(),
    validate,
    createAviso
  )
  .get("/avisos/:idCategoria", sessionValidation(), validate, getAvisos)
  .put(
    "/avisos/:id",
    sessionValidation(true),
    avisosValidation(),
    validate,
    updateAviso
  )
  .delete("/avisos/:id", sessionValidation(true), validate, deleteAviso)

  // login e logout
  .post("/login", loginValidation(), validate, login)
  .post("/logout", sessionValidation(), validate, logout);
