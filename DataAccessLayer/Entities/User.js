const { DataTypes, Model } = require('sequelize')
const Role = require("./Role")
class User extends Model{}

module.exports = (context) => {
    return User.init({
        idUser:{
            type: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement:false,
            allowNull: false,
            field: "id_user"
        },
        nameUser:{
            type:DataTypes.STRING,
            allowNull: false,
            field: "name_user"
        },
        firstnameUser:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "firstname_user"
        },
        loginUser:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "login_user"
        },
        passwordUser:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "pwd_user"
        }
    },{
        sequelize: context,
        modelName: "user",
        tableName: "users",
        createdAt: true,
        updatedAt: true
    })
    ;
}