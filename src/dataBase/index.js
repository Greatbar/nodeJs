const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    database: 'sevadb',
    username: 'postgres',
    password: '115569',
});

const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.dropSchema("public", {});
        await sequelize.createSchema("public", {});
        await sequelize.sync();
        console.log('Sequelize was initialized');
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = {
    sequelize,
    initDB,
};
