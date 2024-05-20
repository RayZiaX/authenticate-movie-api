const BaseModel = require("../../BaseModel");

class DefaultBodyAccount extends BaseModel{
    #login;
    #password;
    #roles;
    #status;
    constructor({login = "", password = "", roles = "", status = ""}){
        super("","")
        this.#login = login
        this.#password = password
        this.#roles = roles
        this.#status = status
    }

    toPrototype(){
        let prototype = {}
        
        if(this.#login != undefined && this.#login != ""){
            prototype.login = this.#login
        }
        
        if(this.#password != undefined && this.#password != ""){
            prototype.password = this.#password
        }
        
        if(this.#roles != undefined && this.#roles != []){
            prototype.roles = this.#roles
        }

        if(this.#status != undefined){
            prototype.status = this.#status == "" ? "open" : this.#status
        }
        return prototype
    }
}

module.exports = DefaultBodyAccount