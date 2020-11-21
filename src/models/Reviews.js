const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('reviews', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
        },
        comentarios:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        puntaje:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
  });
};