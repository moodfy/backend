import { Sequelize } from "sequelize";
// @ts-ignore
import config from "./sequelizeConfig.js";

class Database {
    public connection: Sequelize;

    constructor() {
        // console.log('Conectando BANCO...');
        this.connection = new Sequelize(config as never);
    }

    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            database.connection.authenticate().then(() => {
                console.log('Banco de dados conectado!')
                resolve()
            }).catch(e => reject(e))
        })
    }
}

const database: Database = new Database();

export default database;