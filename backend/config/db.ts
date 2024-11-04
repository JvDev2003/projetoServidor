import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect(){
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        
        Logger.info("Banco conectado com sucesso!")
    } catch (e) {
        Logger.error("Não foi possivel conectar ao banco.")
        Logger.error(`Erro: ${e}`)
    }
}

export default connect;