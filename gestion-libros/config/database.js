const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('biblioteca2', 'root', '26Ja12Pe02', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;