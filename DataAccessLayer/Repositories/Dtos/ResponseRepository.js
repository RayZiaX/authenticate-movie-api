class ResponseRepository{
    #data = null;
    #error;
    constructor() {
       this.#error = new ErrorRepository()
       this.#data = null
    }
    success(){
        return !this.#error.hasError()
    }

    setData(data){
        this.#data = data
    }

    #getStatusCode(){
        if(this.success()){
            return 200
        }else{
            return this.#error.getStatusCode()
        }
    }

    toPrototype(){
        let prototype = {}
        prototype.data = this.#data
        prototype.statuscode = this.#getStatusCode()
        if(this.#error.hasError){
            prototype.error = this.#error
        }
        return prototype
    }

}