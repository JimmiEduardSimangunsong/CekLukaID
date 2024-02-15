const {Sequelize} = require ('sequelize');

const sequelize = new Sequelize('ceklukaid_db', 'root', 'J1mm1Ceklukaid',{
    host: '34.101.151.234',
    dialect: 'mysql'
});

module.exports = sequelize;