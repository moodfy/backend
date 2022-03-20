import { Model, DataTypes} from "sequelize";
import database from "../config/database";

export class User extends Model {
    public userName!: string;
    public spotifyId!: string;
    public acessToken!: string;
}

User.init(
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        spotifyId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acessToken: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        paranoid: true,
        tableName: 'users',
        modelName: 'User',
        sequelize: database.connection,
        underscored: true,
        scopes: {
            withoutStamps: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
        }
    }
)