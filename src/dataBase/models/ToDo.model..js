const Sequelize = require('sequelize');
const {sequelize} = require('..');

class ToDo extends Sequelize.Model {
}

ToDo.init({
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: 'Title',
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: false,
            allowNull: true,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        priority: {
            type: Sequelize.DataTypes.SMALLINT,
            defaultValue: 0
        },
    },
    {sequelize: sequelize, underscored: true, modelName: 'todo'}
);

module.exports = ToDo
