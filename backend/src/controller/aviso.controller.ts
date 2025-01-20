import { Request, Response } from "express";
import Logger from "../../config/logger";
import { CategoriaSchema } from "../models/Categoria.model";
import { AvisoSchema } from "../models/Aviso.model";

export const createAviso = async (req: Request, res: Response) => {
  try {
    const { idCategoria, descricao } = req.body;

    const categoria = await CategoriaSchema.findOne({ id: idCategoria });

    if (!categoria) {
      return res.status(404).json({ mensagem: "Essa categoria não existe!" });
    }

    const avisos = await AvisoSchema.find({});
    const id = avisos.length + 1;

    await AvisoSchema.create({
      id,
      idCategoria,
      descricao,
    });

    return res.status(201).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const getAvisos = async (req: Request, res: Response) => {
  try {
    const { idCategoria } = req.params;

    const categoria = await CategoriaSchema.findOne({ id: idCategoria });

    if (!categoria) {
      return res.status(404).json({ mensagem: "Essa categoria não existe!" });
    }

    const avisos = await AvisoSchema.find({ idCategoria });

    const simpleAviso = avisos.map((aviso) => {
      return { id: aviso.id, descricao: aviso.descricao };
    });

    return res.status(201).json(simpleAviso);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const updateAviso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descricao } = req.body;

    const aviso = await AvisoSchema.findOne({ id: id });

    if (!aviso) {
      return res.status(404).json({ mensagem: "Aviso não encontrado" });
    }

    await aviso.updateOne({ descricao });

    return res.status(200).json({ id, descricao });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const deleteAviso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const aviso = await AvisoSchema.findOne({ id: id });

    if (!aviso) {
      return res.status(404).json({ mensagem: "Aviso não encontrado" });
    }

    await aviso.deleteOne();

    return res.status(200).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};
