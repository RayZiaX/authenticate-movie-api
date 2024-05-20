const BaseError = require('./BaseError')

class BaseResponse{
    _data;
    _error;
    constructor() {
       this._error = new BaseError()
       this._data = null
    }
    success(){
        return !this._error.hasError()
    }

    setData(data){
        this._data = data
    }

    getData(){
        return this._data
    }
    getError(){
        return this._error
    }

    _getStatusCode(){
        if(this.success()){
            return 200
        }else{
            return this._error.getStatusCode()
        }
    }

    toPrototype(){
        let prototype = {
            statuscode : this._getStatusCode(),
            success: this.success()
        }
        if(this._data != null){
            prototype.data = this._data
        }
        if(this._error.hasError()){
            prototype.error = this._error.toPrototype()
        }
        return prototype
    }
}

module.exports = BaseResponse