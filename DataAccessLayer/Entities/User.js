const { DataTypes, Model } = require('sequelize')

class User extends Model{}

module.exports = (context) => {
    return User.init({
        idUser:{
            type: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
            field: "id_User"
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
}