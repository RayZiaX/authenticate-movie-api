class ErrorRepository{
    
    constructor(){
        this.errorMessage = ""
        this.statuscode = 0
        this.technicalMessage = ""
    }

    setErrorMessage(errorMessage, technicalMessage){
        this.errorMessage = errorMessage
        this.technicalMessage = technicalMessage
    }

    setStatusCode(statuscode){
        this.statuscode = statuscode
    }

    getStatusCode(){
        return this.statuscode
    }

    hasError(){
        return (this.errorMessage != "" || this.errorMessage != undefined)
    }
}