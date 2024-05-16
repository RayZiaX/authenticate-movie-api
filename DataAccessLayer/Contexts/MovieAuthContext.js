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
    #users;
    #roles;
    #usersRoles;

    constructor(dbName, userName, password, dbOptions = {}){
        if(!(dbOptions instanceof DbOption)){
            throw new Error(`dbOption is not type ${typeof(DbOption)}`)
        }
        super(dbName,userName,password,dbOptions.toPrototype())
        this.#onModelCreating()
    }

    getUsers(){
        return this.#users
    }

    getRoles(){
        return this.#roles
    }

    getUsersRoles(){
        return this.#usersRoles
    }

    #onModelCreating(){
        this.#users = Entities.User(this)
        this.#roles = Entities.Role(this)
        this.#usersRoles = Entities.UserRole(this)

        this.#onModelConfiguring()
    }

    #onModelConfiguring(){
        this.#users.belongsToMany(this.#roles,{
            as: "roles",
            through: "users_roles",
            foreignKey: "id_user",
            otherKey: "id_role"
        })
        this.#roles.belongsToMany(this.#users, {
            as: "users",
            through: "users_roles",
            foreignKey: "id_role",
            otherKey: "id_user"
        })
    }
}

module.exports = {MovieAuthContext, DbOption}