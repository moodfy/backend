// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnv = require('dotenv')
dotEnv.config()

export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    timezone: string;
    seederStorage: string;
    seederStorageTableName: string;
    migrationStorageTableName: string;
    define: {
        timestamps: boolean,
    }
    pool: {
        max: number,
        min: number,
        idle: number,
        acquire: number
    }
}

export const databaseConfig: DatabaseConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: true,
    force: true,
    timezone: 'utc',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seeds',
    migrationStorageTableName: 'sequelize_migrations',
    define: {
        timestamps: true,
    },
    pool: {
        max: 20,
        min: 5,
        idle: 10000,
        acquire: 30000
    },
};