const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("wishlist", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        volume_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        volume_number:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
