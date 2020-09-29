const DB_SCHEMA = process.env.DB_SCHEMA;

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        course_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'course',
        schema: DB_SCHEMA,
        timestamps: false
    });
    Course.associate = function(models) {
        models.Course.hasMany(models.Classroom, {
            foreignKey: {
                name: 'course_id',
                type: DataTypes.UUID
            },
            as: 'course'
        });
    };
    return Course;
}