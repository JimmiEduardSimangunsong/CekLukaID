const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize('ceklukaid_db', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;