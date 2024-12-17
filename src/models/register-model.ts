import { DataTypes, Model } from "sequelize";
import { sequelize } from "../plugins/sequelize-plugin";
import { convertEmptyStringsToNull } from "../db/hook/converemptystringtonull-hook";
import { beforeSave } from "../db/hook/timeformat-hook";

class RegisterModel extends Model {
    userRegisterId!: string;
    username!: string;
    userEmail!: string;
    userPassword!: string;
    isEnabled!: boolean;
    isDeleted!: boolean;
}


RegisterModel.init({
    application_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: "application id is the primary key of register table in uuid format"
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "username is mandatory for register"
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "userEmail is mandatory for register"
    },
    userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "userPassword is mandatory for register"
    },
    is_Enabled: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
    is_Deleted: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize, 
    tableName: 'registerUsers',
    timestamps: true,
    hooks: {
        beforeValidate: (instance) => {
            convertEmptyStringsToNull(instance);
        },
        beforeSave: (instance) => {
            beforeSave(instance);
        }
    }
});

export default RegisterModel;