const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    firstname:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono:{
      type: DataTypes.BIGINT,
      allowNull: true
    }
  });
}; 
  
