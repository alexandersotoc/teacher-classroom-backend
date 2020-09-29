const DB_SCHEMA = process.env.DB_SCHEMA;

const { TYPE } = require('../constants/item');

module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        display_order: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    TYPE.LECTURE,
                    TYPE.HOMEWORK,
                    TYPE.ASSIGNMENT
                ]],
            },
            allowNull: false
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'item',
        schema: DB_SCHEMA
    });
    Item.associate = function(models) {
        models.Item.belongsTo(models.Topic, {
            foreignKey: {
                name: 'topic_id',
                type: DataTypes.INTEGER
            },
            as: 'topic'
        });
    };
    return Item;
}