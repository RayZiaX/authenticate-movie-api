const { responses } = require("../../../Common/Responses/index")
const ErrorService = require('./ErrorService')
class ServiceResponse extends responses.BaseResponse{
    constructor(){
        super()
        super._error = new ErrorService()
    }

    toPrototype(){
        let prototype = super.toPrototype()
        return prototype
    }
}

module.exports = ServiceResponse