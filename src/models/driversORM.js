// src/models/driversORM.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import User from './usersORM.js';

const Driver = sequelize.define('Driver', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    limitations: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_issue: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade_license: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'driver',
    timestamps: false,
});

User.hasMany(Driver, { foreignKey: 'user_id' });
Driver.belongsTo(User, { foreignKey: 'user_id' });

export default Driver;