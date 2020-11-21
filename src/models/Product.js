const { DataTypes } = require('sequelize');
const img = require('./img/imgDefault')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,      
      defaultValue: img
    }
  });
};
