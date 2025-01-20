import { body } from "express-validator";

export const avisosValidation = () => {
  return [
    body("descricao")
      .isString()
      .withMessage("A descrição não pode ser vazia!")
      .isLength({ max: 500 })
      .withMessage("A descrição não pode ter mais que 500 caracteres"),
  ];
};
