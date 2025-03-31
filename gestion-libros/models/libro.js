const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Libro = sequelize.define('Libro', {
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  anio_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Libro;