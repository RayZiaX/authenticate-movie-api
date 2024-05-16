const { errors } = require("../../../Common/Responses/index")

class BoError extends errors.BaseError{
    constructor(){
        super()
    }

    toPrototype(){
        let prototype = super.toPrototype()

        return prototype
    }
}

module.exports = BoError