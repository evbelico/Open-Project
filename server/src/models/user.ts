// @ts-check

import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Optional } from 'sequelize';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { database } from '../db/database'
import Token from './tokens'

export interface UserAttributes {
    id: number;
    email: string;
    pseudonym?: string;
    password: string;
    createdAt?: Date;
    birthday?: Date;
    token: string;
    tokenExpired: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'pseudonym' | 'birthday'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public birthday: Date;
    public pseudonym: string;
    public token!: string;
    public tokenExpired!: boolean;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public static associations: {
    //     token: Association<User, Token>
    // }

}

User.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        pseudonym: {
            type: DataTypes.STRING,
            allowNull: true,
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
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tokenExpired: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            // allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'user'
    },
);

// User.hasOne(Token, { sourceKey: "id" });

export default User;
// export interface UserInstance åextends Model<UserAttributes>, UserAttributes {
//     associations: {
//         tokens: Association<UserInstance, typeof TokenModel>;
//       };
// }

// const UserModel = <UserInstance>database.define('user', {
//     id: {
//         primaryKey: true,
//         autoIncrement: true,
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isEmail: true,
//         },
//     },
//     pseudonym: {
//         type: DataTypes.STRING,
//         // allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         // allowNull: false,
//     },
//     birthday: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     token: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// });

// UserModel.hasOne()
// export default UserModel;
// export const User = sequelize.define Model<UserModel, UserAttributes> {}
