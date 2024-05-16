class BaseController{
    _service;
    constructor(service){
        this._service = service
    }

    _sendResponse(res,statuscode, value){
        return res.status(statuscode).json(value)
    }
}


module.exports = BaseController