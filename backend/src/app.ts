require("dotenv").config();

import express from "express";
import config from "config";
import cors from "cors";
import db from "../config/db";
import Logger from "../config/logger";
import router from "./router";
import morganMiddleware from "./middleware/morgan.middleware";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Rotas
app.use("/", router);

const port = config.get<string>("port");

app.listen(port, async () => {
  await db();
  Logger.info(`O servidor está na porta ${port}`);
});
