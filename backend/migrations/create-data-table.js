const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/db_excel_node');

const createTable = async () => {
    await sequelize.sync({ force: true });

    console.log('Data table created');
    await sequelize.close();
};

createTable().catch(console.error);
