const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('checkout',{
        provincia:{
            type: DataTypes.STRING,
            allowNull: false
        },
        departamento:{
            type: DataTypes.STRING,
            allowNull: false
        },
        localidad:{
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            defaultValue: 'Pendiente'
        },
        comprobante:{
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
}

