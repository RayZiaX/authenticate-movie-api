const BaseModel = require("../../BaseModel")

class DefaultAccountResponse extends BaseModel{
    #idUser
    #firstname
    #name
    #login
    #roles
    constructor({idUser, firstnameUser,nameUser,loginUser,roles,createdAt,updatedAt}){
        super({createdAt: createdAt, updatedAt: updatedAt})
        this.#idUser = idUser
        this.#firstname = firstnameUser
        this.#name = nameUser
        this.#login = loginUser
        this.#roles = roles
    }

    toPrototype(){
        let prototype = {}
        
        if(this.#idUser != undefined && this.#idUser != ""){
            prototype.idUser = this.#idUser
        }

        if(this.#firstname != undefined && this.#firstname != ""){
            prototype.firstname = this.#firstname
        }

        if(this.#name != undefined && this.#name != ""){
            prototype.name = this.#name
        }

        if(this.#login != undefined && this.#login != ""){
            prototype.login = this.#login
        }

        if(this.#roles != undefined && this.#roles != []){
            prototype.roles = this.#roles
        }

        return super._toPrototype(prototype)
    }
}

module.exports = DefaultAccountResponse