const env = process.env.NODE_ENV === 'production' ? {
   prefix: 'build',
   suffix: 'js'
} : {
   prefix: 'src',
   suffix: 'ts'
}

module.exports = {
 "type": "postgres",
 "host": process.env.DB_HOST,
 "port": 5432,
 "username": process.env.DB_USERNAME,
 "password": process.env.DB_PASSWORD,
 "database": process.env.DB_DATABASE,
 "synchronize": true,
 "logging": false,
 "entities": [
   `${env.prefix}/entity/*.${env.suffix}`,
 ],
 "migrations": [
   `${env.prefix}/migration/*.${env.suffix}`,
 ],
 "subscribers": [
   `${env.prefix}/subscribers/**/*.${env.suffix}`,
 ],
 "cli": {
   "entitiesDir": `${env.prefix}/entity`,
   "migrationsDir": `${env.prefix}/migration`,
   "subscribersDir": `${env.prefix}/subscriber`
 }
}