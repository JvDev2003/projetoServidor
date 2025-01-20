import { Request, Response } from "express";
import Logger from "../../config/logger";
import { CategoriaSchema } from "../models/Categoria.model";

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;

    const dados = await CategoriaSchema.find({});
    const index = dados.length + 1;

    await CategoriaSchema.create({ nome, id: index });

    return res.status(201).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await CategoriaSchema.find({});
    const simpleCategoras = categorias.map((categoria) => {
      const { _id, nome, id } = categoria;
      return { id, nome };
    });

    return res.status(201).json(simpleCategoras);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoria = await CategoriaSchema.find({ id: id });

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada" });
    }

    return res.status(200).json(categoria);
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const categoria = await CategoriaSchema.findOne({ id: id });

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada" });
    }

    await categoria.updateOne({ nome, id });

    return res.status(200).json({ nome });
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const categoria = await CategoriaSchema.findOne({ id: id });

    if (!categoria) {
      return res.status(404).json({ mensagem: "Categoria não encontrada" });
    }

    await categoria.deleteOne();

    return res.status(200).json({});
  } catch (e: any) {
    Logger.error(`Ocorreu um erro: ${e.message}`);
    return res
      .status(500)
      .json({ mensagem: "Ocorreu um erro tente novamente mais tarde!" });
  }
};
