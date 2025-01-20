import { model, Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    nome: { type: String, required: true },
    id: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const CategoriaSchema = model("categoria", categoriaSchema);
