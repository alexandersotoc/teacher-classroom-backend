const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        logging: false
    }
);