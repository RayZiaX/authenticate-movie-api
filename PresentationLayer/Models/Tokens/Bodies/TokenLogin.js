class TokenLogin{
    #login
    #password
    #from
    constructor({login="", password="", from=""}) {
        this.#login = login
        this.#password = password
        this.#from = from
    }

    toPrototype(){
        let prototype = {}
        if(this.#login != undefined && this.#login != ""){
            prototype.login = this.#login
        }
        if(this.#password != undefined && this.#password != ""){
            prototype.password = this.#password
        }
        if(this.#from != undefined && this.#from != ""){
            prototype.from = this.#from
        }

        return prototype
    }
}

module.exports = TokenLogin