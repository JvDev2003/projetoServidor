import { UsuarioSchema } from "../models/Usuario.model";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../../config/hashFunctions";
import config from "config";
import Logger from "../../config/logger";
import jwt from "jsonwebtoken";
import { Conectado } from "../models/Conectados.model";
import { Connection } from "mongoose";


export async function createUser(req: Request, res: Response) {
  try {
    const { nome, senha, email } = req.body;

    const user = await UsuarioSchema.findOne({ email: email });

    if (user) {
      res.status(409).json({ mensagem: "Email já cadastrado" });
      return
    }

    //const hash = await hashPassword(senha);

    await UsuarioSchema.create({
      nome,
      email,
      senha: senha,
      permissao: "user",
    });

    Logger.info("Usuario criado com sucesso");

    res.status(201).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    res.status(400).json({ mensagem: "Dados invalidos" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UsuarioSchema.find({ permissao: { $ne: "admin" } });

    const simpleUsers = users.map((user) => {
      const { email, nome, senha } = user;

      return {
        nome,
        email,
        senha,
      };
    });

    res.status(201).json(simpleUsers);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    res.status(500).json({ mensagem: "Tente Novamente mais tarde!" });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const { jwt } = req.body;

    if (!jwt.admin) {
      if (jwt.email !== email) {
        res.status(401).json({ mensagem: "Você não tem permissão!" });
        return
      }
    }

    const user = await UsuarioSchema.findOne({ email: email });

    if (!user) {
      res.status(404).json({ mensagem: "Usuário não encontrado" });
      return
    }

    Logger.info("Usuario obtido com sucesso");

    //return res.status(201).json(user);

    res.status(201).json({
      nome: user.nome,
      email: user.email,
      senha: "",
    });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    res.status(500).json({ mensagem: "Tente Novamente mais tarde!" });
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const { nome, senha, jwt } = req.body;

    if (!jwt.admin) {
      if (jwt.email !== email) {
        return res.status(401).json({ mensagem: "Você não tem permissão!" });
      }
    }

    const user = await UsuarioSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const hash = await hashPassword(senha);

    await UsuarioSchema.updateOne(
      { email: email },
      {
        $set: {
          nome,
          senha: hash,
        },
      }
    );

    Logger.info("Usuario editado com sucesso");

    return res.status(200).json({ nome, email, senha: hash });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res.status(500).json({ mensagem: "Tente Novamente mais tarde!" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const { jwt } = req.body;

    if (!jwt.admin) {
      if (jwt.email !== email) {
        return res.status(401).json({ mensagem: "Você não tem permissão!" });
      }
    }

    const user = await UsuarioSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    await user.deleteOne();

    Logger.info("Usuario deletado com sucesso");

    return res.status(200).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res.status(500).json({ mensagem: "Tente Novamente mais tarde!" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    const user = await UsuarioSchema.findOne({ email: email });

    if (!user) {
      res.status(401).json({ mensagem: "Email e/ou senha invalidos" });
      return
    }

    // if (!(await comparePassword(senha, user.senha))) {
    //   return res.status(401).json({ mensagem: "Email e/ou senha invalidos" });
    // }

    if (senha !== user.senha) {
      res.status(401).json({ mensagem: "Email e/ou senha invalidos" });
      return
    }
    const jwtSecret = config.get<string>("jwtSecret");

    const token = jwt.sign(
      {
        email: user.email,
        admin: user.permissao === "admin" ? true : false,
      },
      jwtSecret,
      { expiresIn: "15m" }
    );

    await Conectado.create({ email });

    Logger.info("Usuario logado com sucesso");

    res.status(200).json({ token });
  } catch (e: any) {
    Logger.error(`Erro que ocorreu: ${e}`);

    res
      .status(401)
      .json({ mensagem: "Ocorreu um erro, tente mais tarde!" });
  }
}

export const logout = async (req: Request, res: Response) => {
  try {

    const { jwt } = req.body

    const user = await UsuarioSchema.findOne({ email: jwt.email })

    if (!user) {
      res.status(401).json({});
      return
    }

    await Conectado.deleteOne({ email: jwt.email })

    res.status(201).json({});
  } catch (error) {
    res.status(401).json({});
  }
};


export const getConectados = async () => {

  return await Conectado.find({}, { _id: 0, email: 1 })
}