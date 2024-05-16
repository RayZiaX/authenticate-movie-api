const {responses} = require('../../../Common/Responses/index')
const ErrorRepository = require('./ErrorRepository')

class ResponseRepository extends responses.BaseResponse{

    constructor(){
        super()
        super._error = new ErrorRepository()
    }

    toPrototype(){
        let prototype = super.toPrototype()
        return prototype
    }
}

module.exports = ResponseRepository