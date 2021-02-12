import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Optional } from 'sequelize';
import { database } from '../db/database'
import User from './user'
import models from './index'

export interface TokenAttributes {
    id?: number,
    content?: string,
    payloadType?: string,
    userId?: number,
    createdAt?: Date,
    expired?: number,
}

export interface TokenCreationAttributes extends Optional<TokenAttributes, 'id' | 'content' | 'payloadType' | 'userId' | 'expired'> {}

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public id: number;
    public content: string;
    public payloadType!: string;
    public userId: number;
    public expired: number;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Token.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    payloadType: {
        type: DataTypes.ENUM('register', 'forgot'),
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    expired: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: database,
    tableName: 'token'
});

Token.belongsTo(User, { targetKey: "id"});

export default Token;

// export interface TokenInstance extends Model<TokenAttributes>, TokenAttributes {
// }

// const TokenModel = <TokenInstance>database.define(
//     'token', 
//     {
//     id: {
//         primaryKey: true,
//         autoIncrement: true,
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     payloadType: {
//         type: DataTypes.ENUM('register', 'forgot'),
//         allowNull: false,
//     },
//     userId: {
//         type: DataTypes.NUMBER,
//         allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//     }
// },
// );
// export default TokenModel;