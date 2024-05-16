class BaseModel{
    #createdAt
    #updatedAt
    constructor({createdAt='',updatedAt=''}){
        this.#createdAt = createdAt
        this.#updatedAt = updatedAt
    }

    toPrototype(){
        let prototype = {}

        if(this.#createdAt != ''){
            prototype.createdAt = this.#createdAt
        }

        if(this.#updatedAt != ''){
            prototype.updatedAt = this.#updatedAt
        }

        return prototype
    }
}

module.exports = BaseModel