const DB_SCHEMA = process.env.DB_SCHEMA;

const { ACCOUNT_STATUS, TYPE_OF_ACCOUNT } = require('../constants/user');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING
        },
        type_of_account: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    TYPE_OF_ACCOUNT.ADMIN,
                    TYPE_OF_ACCOUNT.TEACHER,
                    TYPE_OF_ACCOUNT.STUDENT
                ]],
            },
            allowNull: false
        },
        account_status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [[
                    ACCOUNT_STATUS.ACTIVE, 
                    ACCOUNT_STATUS.BANNED
                ]],
            },
            defaultValue: ACCOUNT_STATUS.ACTIVE,
            allowNull: false
        }
    }, {
        tableName: 'user',
        schema: DB_SCHEMA,
        timestamps: false
    });
    User.associate = function(models) {
        models.User.hasMany(models.Classroom, {
            foreignKey: {
                name: 'teacher_id',
                type: DataTypes.UUID
            },
            as: 'teacher'
        });
        models.User.belongsToMany(models.Classroom, { 
            through: 'ClassroomStudents',
            foreignKey: {
                name: 'user_id',
                type: DataTypes.UUID
            },
            as: 'students' 
        });
    };
    return User;
}