const Sequelize = require("sequelize");
const {sequelize} = require("..");
const ToDo = require('./ToDo.model.');
const Token = require('./Token.model');

class User extends Sequelize.Model {
}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        login: {
            type: Sequelize.STRING,
            allowNull: null,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'seva@gmail.com',
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "",
        },
    },
    {sequelize: sequelize, underscored: true, modelName: "user"}
);

User.hasMany(ToDo); // Много к одному туду
ToDo.belongsTo(User, { // Одно к юзеру через ключ
    foreignKey: "userId"
});

User.hasMany(Token); // Много к одному туду
Token.belongsTo(User, {
    foreignKey: "userId"
});

module.exports = User;