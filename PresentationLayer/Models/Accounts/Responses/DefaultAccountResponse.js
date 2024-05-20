const BaseModel = require("../../BaseModel")

class DefaultAccountResponse extends BaseModel{
    #idAccount
    #login
    #roles
    #status
    constructor({idAccount, loginAccount,roles,status,createdAt,updatedAt}){
        super({createdAt: createdAt, updatedAt: updatedAt})
        this.#idAccount = idAccount
        this.#login = loginAccount
        this.#roles = roles
        this.#status = status
    }

    toPrototype(){
        let prototype = {}
        
        if(this.#idAccount != undefined && this.#idAccount != ""){
            prototype.idAccount = this.#idAccount
        }

        if(this.#login != undefined && this.#login != ""){
            prototype.login = this.#login
        }

        if(this.#roles != undefined && this.#roles != []){
            prototype.roles = this.#roles
        }

        if(this.#status != undefined && this.#status != []){
            prototype.status = this.#status
        }

        return super._toPrototype(prototype)
    }
}

module.exports = DefaultAccountResponse