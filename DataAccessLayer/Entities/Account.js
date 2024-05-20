const { DataTypes, Model } = require('sequelize')
const Role = require("./Role")
class Account extends Model{}

module.exports = (context) => {
    return Account.init({
        idAccount:{
            type: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement:false,
            allowNull: false,
            unique:true,
            field: "id_account"
        },
        loginAccount:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "login_account"
        },
        passwordAccount:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "pwd_account"
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "status_account"
        }
    },{
        sequelize: context,
        modelName: "account",
        tableName: "accounts",
        createdAt: true,
        updatedAt: true
    })
    ;
}