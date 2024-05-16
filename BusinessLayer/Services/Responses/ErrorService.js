const { errors } = require("../../../Common/Responses/index")

class ErrorService extends errors.BaseError{
    constructor(){
        super()
    }
    
}

module.exports = ErrorService