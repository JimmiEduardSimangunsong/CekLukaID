const sequelize = require('./database');
const uuid = require('uuid');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: () => uuid.v4(),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false, // Menonaktifkan kolom createdAt dan updatedAt
    });

    const Treatment = sequelize.define('Treatment', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      woundType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penangananawal: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rekomendasiobat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      timestamps: false, // Disable automatic createdAt and updatedAt
    });

    
    module.exports = { User, Treatment};