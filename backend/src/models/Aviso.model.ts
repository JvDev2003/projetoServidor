import { model, Schema } from "mongoose";

const avisoSchema = new Schema(
  {
    id: { type: String, required: true },
    descricao: { type: String, required: true },
    idCategoria: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const AvisoSchema = model("aviso", avisoSchema);
