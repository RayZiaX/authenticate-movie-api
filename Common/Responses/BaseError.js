class BaseError{
    _errorMessage = ""
    _statuscode = 0
    _technicalMessage = ""
    constructor(){

    }

    setErrorMessage(errorMessage, technicalMessage){
        this._errorMessage = errorMessage
        this._technicalMessage = technicalMessage
    }

    setStatusCode(statuscode){
        this._statuscode = statuscode
    }

    getMessage(){
        return this._errorMessage
    }

    getStatusCode(){
        return this._statuscode
    }

    hasError(){
        return this._statuscode > 0
    }

    toPrototype(){
        let prototype = {}
        
        if(this._statuscode > 0){
            prototype.statuscode = this._statuscode
        }

        if(this._errorMessage != ""){
            prototype.message = this._errorMessage
        }

        if(this._technicalMessage != ""){
            prototype.technicalMessage = this._technicalMessage
        }

        return prototype
    }
}

module.exports = BaseError