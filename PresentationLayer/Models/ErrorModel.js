class ErrorModel{
    #message
    constructor(message){
        this.#message = message
    }

    toPrototype(){
        let prototype = {
            message: this.#message
        }

        return prototype
    }
}

module.exports = ErrorModel