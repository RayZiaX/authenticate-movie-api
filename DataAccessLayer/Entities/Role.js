const { DataTypes, Model } = require('sequelize')

class Role extends Model{}

module.exports = (context) => {
    return Role.init({
        idRole:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: "id_role"
        },
        nameRole:{
            type: DataTypes.STRING,
            allowNull: false,
            field: "name_role"
        },
        actif:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "active_role"
        }
    },{
        sequelize: context,
        modelName: "role",
        tableName: "roles",
        createdAt: true,
        updatedAt: true
    })
    
}
