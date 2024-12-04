import { body } from "express-validator";

export const createUserValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome não pode ser vazio!")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter 3 ou mais caracteres!")
      .isLength({ max: 100 })
      .withMessage("O nome não pode ter mais que 100 caracteres"),
    body("email").isEmail().withMessage("O email não pode ser vazio!"),
    body("senha")
      .isNumeric()
      .withMessage("A senha não pode ser vazia!")
      .isLength({ min: 3 })
      .withMessage("A senha deve ter 3 ou mais caracteres!")
      .isLength({ max: 6 })
      .withMessage("A senha não pode ter mais que 6 caracteres"),
  ];
};

export const editUserValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome não pode ser vazio!")
      .isLength({ min: 3 })
      .withMessage("O nome deve ter 3 ou mais caracteres!")
      .isLength({ max: 100 })
      .withMessage("O nome não pode ter mais que 100 caracteres"),
    body("senha")
      .exists()
      .withMessage("O campo senha deve exitir no request")
      .isLength({ min: 3 })
      .withMessage("A senha deve ter 3 ou mais caracteres!")
      .isLength({ max: 6 })
      .withMessage("A senha não pode ter mais que 6 caracteres"),
  ];
};

export const loginValidation = () => {
  return [
    body("email").isEmail().withMessage("O email não pode ser vazio!"),
    body("senha")
      .isNumeric()
      .withMessage("A senha não pode ser vazia!")
      .isLength({ min: 3 })
      .withMessage("A senha deve ter 3 ou mais caracteres!")
      .isLength({ max: 6 })
      .withMessage("A senha não pode ter mais que 6 caracteres"),
  ];
};
