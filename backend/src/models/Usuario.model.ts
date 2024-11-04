import {model, Schema} from "mongoose";

const usuarioSchema = new Schema(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        permissao: { type: String, default: 'user' },
      },
      {
        timestamps: true,
      }
)

export const UsuarioSchema = model("usuario", usuarioSchema);