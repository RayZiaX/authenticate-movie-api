const { Sequelize, Model } = require('sequelize')
const { Entities } = require('../Entities/index')

class DbOption{
    constructor({host = '', dialect = '', storage = '', mode = undefined, logging=false}){
        this.host = host
        this.dialect = dialect
        this.storage = storage
        this.mode = mode
        this.logging = logging
    }

    toPrototype(){
        let prototype = {
            logging: this.logging
        }
        if(this.host != ''){
            prototype.host = this.host
        }
        if(this.dialect != ''){
            prototype.dialect = this.dialect
        }
        if(this.storage != ''){
            prototype.storage = this.storage
        }
        if(this.mode != undefined){
            prototype.mode = this.mode
        }
        return prototype
    }
}


class MovieAuthContext extends Sequelize{
    #accounts;
    #roles;
    #accountsRoles;

    constructor(dbName, userName, password, dbOptions = {}){
        if(!(dbOptions instanceof DbOption)){
            throw new Error(`dbOption is not type ${typeof(DbOption)}`)
        }
        super(dbName,userName,password,dbOptions.toPrototype())
        this.#onModelCreating()
    }

    getAccounts(){
        return this.#accounts
    }

    getRoles(){
        return this.#roles
    }

    getAccountsRoles(){
        return this.#accountsRoles
    }

    #onModelCreating(){
        this.#accounts = Entities.Account(this)
        this.#roles = Entities.Role(this)
        this.#accountsRoles = Entities.AccountRole(this)

        this.#onModelConfiguring()
    }

    #onModelConfiguring(){
        this.#accounts.belongsToMany(this.#roles,{
            as: "roles",
            through: "accounts_roles",
            foreignKey: "id_account",
            otherKey: "id_role"
        })
        this.#roles.belongsToMany(this.#accounts, {
            as: "accounts",
            through: "accounts_roles",
            foreignKey: "id_role",
            otherKey: "id_account"
        })
    }
}

module.exports = {MovieAuthContext, DbOption}