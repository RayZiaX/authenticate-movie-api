const { DataTypes, Model } = require('sequelize')

class AccountRole extends Model{}

module.exports = (context) => {
    return AccountRole.init({
        idAccount: {
            type: DataTypes.UUIDV4,
            references:{
                model: "account",
                key: "id_account"
            },
            field:"id_account",
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
        modelName: "accountRole",
        tableName: "accounts_roles",
        createdAt: true,
        updatedAt: true
    })
    
}
