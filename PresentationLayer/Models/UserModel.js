const BaseModel = require("./BaseModel")

class UserModel extends BaseModel{
    #idUser
    #firstname
    #lastname
    #login
    #roles
    constructor({idUser, firstnameUser,lastnameUser,loginUser,roles,createdAt,updatedAt}){
        super({createdAt: createdAt, updatedAt: updatedAt})
        this.#idUser = idUser
        this.#firstname = firstnameUser
        this.#lastname = lastnameUser
        this.#login = loginUser
        this.#roles = roles
    }

    toPrototype(){
        let prototype = super.toPrototype()
        if(this.#idUser != undefined || this.#idUser != ""){
            prototype.idUser = this.#idUser
        }

        if(this.#firstname != undefined || this.#firstname != ""){
            prototype.firstname = this.#firstname
        }

        if(this.#lastname != undefined || this.#lastname != ""){
            prototype.lastname = this.#lastname
        }

        if(this.#login != undefined || this.#login != ""){
            prototype.login = this.#login
        }

        return prototype
    }
}

module.exports = UserModel