const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orden', {
        status:{
            type: DataTypes.ENUM('carrito','creada','procesando','completa','cancelada'),
            allowNull:false
        }
    });
  };
  
