const { businessObjects : {BoUser} } = require("../BusinessObjects/index")
const ServiceResponse = require('./Responses/ServiceResponse')


class UserServices{
    _response;
    constructor(){
        this._response = new ServiceResponse()
    }

    async createUserAsync(userRepo, data){
        let bo = new BoUser(data)
        let boResponse = bo.checkDatasToInsert()
        if(boResponse.success()){
            let repoResponse = await userRepo.createAsync(bo.toCreateUser(),false)
            if(repoResponse.success){
                this._response.setData(repoResponse.data)
            }else{
                this._response.getError().setErrorMessage(repoResponse.error.message, repoResponse.error.technicalMessage)
                this._response.getError().setStatusCode(repoResponse.error.statuscode)
                if(process.env.ENV.toLocaleLowerCase() == "dev"){
                    console.log(repoResponse.error)
                }
            }
        }else{
            this._response.getError().setErrorMessage()
            this._response.getError().setStatusCode(boResponse._getStatusCode())
        }
        
        return this._response.toPrototype()
    }

    async getAccountByIdAsync(userRepo, id){
        let boResponse = BoUser.checkId()
        if(!boResponse.success){
            this._response.getError().setErrorMessage(boResponse.error.message, boResponse.error.technicalMessage)
            this._response.getError().setStatusCode(boResponse.statuscode)
            return this._response.toPrototype()
        }

        let repoResponse = await userRepo.getByPrimaryKeyAsync(id,false)
        if(repoResponse.success){
            this._response.setData(repoResponse.data)
        }else{
            this._response.getError().setErrorMessage(repoResponse.error.message)
            this._response.getError().setStatusCode(repoResponse.statuscode)
        }

        return this._response.toPrototype()
    }

    async updateAccountByIdAsync(userRepo, data){
        let bo = new BoUser(data)
        let boResponse = bo.checkDatas()
        if(boResponse.success()){
            let protoBo = bo.toPrototype()
            let repoResponse = await userRepo.updateUserAsync(protoBo,protoBo.id,false)
            if(repoResponse.success){
                this._response.setData(repoResponse.data)
            }else{
                this._response.getError().setErrorMessage(repoResponse.error.message, repoResponse.error.technicalMessage)
                this._response.getError().setStatusCode(repoResponse.error.statuscode)
                if(process.env.ENV.toLocaleLowerCase() == "dev"){
                    console.log()
                    console.log("Erreur dans l'update")
                    console.log(repoResponse.error)
                }
            }

        }else{
            this._response.getError().setErrorMessage()
            this._response.getError().setStatusCode(boResponse._getStatusCode())
        }
        
        return this._response.toPrototype()
    }
}

module.exports = UserServices