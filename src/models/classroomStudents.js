const DB_SCHEMA = process.env.DB_SCHEMA;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ClassroomStudents', {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        classroom_id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
    }, {
        tableName: 'classroom_students',
        schema: DB_SCHEMA,
        timestamps: false
    });
}