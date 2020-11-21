const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('lineaDeOrden', {
        price:{
            type: DataTypes.INTEGER
        },
        quantity:{
            type: DataTypes.INTEGER,
            defaultValue: 1,
			validate: {
				min: 0,
			},
        }
    });
  };
  
