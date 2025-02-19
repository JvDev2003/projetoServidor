import { model, Schema } from "mongoose";

const conectadoSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

export const Conectado = model("conectado", conectadoSchema);
