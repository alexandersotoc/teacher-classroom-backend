const DB_SCHEMA = process.env.DB_SCHEMA;

module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        topic_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        display_order: {
            type: DataTypes.INTEGER
        },
        classroom_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        }
    }, {
        tableName: 'topic',
        schema: DB_SCHEMA
    });
    Topic.associate = function(models) {
        models.Topic.belongsTo(models.Classroom, {
            foreignKey: {
                name: 'classroom_id',
                type: DataTypes.UUID
            },
            as: 'classroom'
        });
        models.Topic.hasMany(models.Item, {
            foreignKey: {
                name: 'topic_id',
                type: DataTypes.INTEGER
            },
            as: 'items'
        });
    };
    return Topic;
}