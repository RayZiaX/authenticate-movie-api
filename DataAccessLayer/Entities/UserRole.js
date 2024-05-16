const { DataTypes, Model } = require('sequelize')

class UserRole extends Model{}

module.exports = (context) => {
    return UserRole.init({
        idUser: {
            type: DataTypes.UUIDV4,
            references:{
                model: "user",
                key: "id_user"
            },
            field:"id_user",
            primaryKey: true
        },
        idRole:{
            type: DataTypes.INTEGER,
            references:{
                model: "role",
                key:"id_role"
            },
            field:"id_role",
            primaryKey: true
        }
    },{
        sequelize: context,
        modelName: "userRole",
        tableName: "users_roles",
        createdAt: true,
        updatedAt: true
    })
    
}
