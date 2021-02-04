import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { database } from '../db/database'

export interface UserAttributes {
    id?: number;
    email: string;
    pseudonym: string;
    password: string;
    createdAt?: Date;
    birthday?: Date;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const UserModel = <UserInstance>database.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pseudonym: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        // allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default UserModel;
// export const User = sequelize.define Model<UserModel, UserAttributes> {}
