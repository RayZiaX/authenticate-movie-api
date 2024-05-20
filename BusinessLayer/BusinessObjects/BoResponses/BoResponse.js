const BoError = require('./BoError')
const { responses } = require("../../../Common/Responses/index")

class BoResponse extends responses.BaseResponse{
    constructor(){
        super()
        super._error = new BoError()
    }
    toPrototype(){
        let prototype = super.toPrototype()
        return prototype
    }
}

module.exports = BoResponse