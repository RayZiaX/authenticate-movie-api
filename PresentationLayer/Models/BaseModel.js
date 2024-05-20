class BaseModel{
    #createdAt
    #updatedAt
    constructor({createdAt='',updatedAt=''}){
        this.#createdAt = createdAt
        this.#updatedAt = updatedAt
    }

    _toPrototype(prototype){

        let proto = {}

        if(prototype != {} && prototype != undefined){
            proto = prototype
        }

        if(this.#createdAt != ''){
            proto.createdAt = this.#createdAt
        }

        if(this.#updatedAt != ''){
            proto.updatedAt = this.#updatedAt
        }

        return proto
    }
}

module.exports = BaseModel