// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotEnv = require('dotenv')
dotEnv.config()

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    // logging: true,
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