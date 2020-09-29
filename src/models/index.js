const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../database');

const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log(`Database and tables generated`)
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
