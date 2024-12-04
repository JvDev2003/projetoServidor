import { body } from "express-validator";

export const categoriaValidation = () => {
  return [
    body("nome")
      .isString()
      .withMessage("O nome não pode ser vazio!")
      .isLength({ min: 1 })
      .withMessage("O nome deve ter 1 ou mais caracteres!")
      .isLength({ max: 150 })
      .withMessage("O nome não pode ter mais que 150 caracteres"),
  ];
};
