const DB_SCHEMA = process.env.DB_SCHEMA;

module.exports = (sequelize, DataTypes) => {
    const Classroom = sequelize.define('Classroom', {
        classroom_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        teacher_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        course_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'classroom',
        schema: DB_SCHEMA,
        timestamps: false
    });
    Classroom.associate = function(models) {
        models.Classroom.belongsTo(models.User, {
            foreignKey: {
                name: 'teacher_id',
                type: DataTypes.UUID
            },
            as: 'teacher'
        });
        models.Classroom.belongsTo(models.Course, {
            foreignKey: {
                name: 'course_id',
                type: DataTypes.UUID
            },
            as: 'course'
        });
        models.Classroom.belongsToMany(models.User, { 
            through: 'ClassroomStudents',
            foreignKey: {
                name: 'classroom_id',
                type: DataTypes.UUID
            },
            as: 'students'
        });
        models.Classroom.hasMany(models.Topic, {
            foreignKey: {
                name: 'classroom_id',
                type: DataTypes.UUID
            },
            as: 'topics'
        });
    };
    return Classroom;
}