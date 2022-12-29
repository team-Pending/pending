const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Upload extends Model {}

Upload.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        //added for necessity to make work
        primaryKey: true,
    },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'user',
    //         key: 'id',
    //         unique: true
    //     }
    // },
    title: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'upload',
});

module.exports = Upload;
