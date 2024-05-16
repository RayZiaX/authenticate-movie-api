const { businessObjects : {BoUser} } = require("../BusinessObjects/index")
const ServiceResponse = require('./Responses/ServiceResponse')


class UserServices{
    _response;
    constructor(){
        this._response = new ServiceResponse()
    }

    async createUserAsync(repositories, data){
        let bo = new BoUser(data)
        let boResponse = bo.checkDatasToInsert()
        if(boResponse.success()){
            let repoRolesResponse = await repositories.getRoleRepository().existsRangeByIdsAsync(data.roles)
            if(repoRolesResponse.success){
                let repoUserResponse = await repositories.getUserRepository().createUserWithRolesAsync(bo.toCreateUser(),data.roles)
                if(repoUserResponse.success){
                    this._response.setData(repoUserResponse.data)
                }else{
                    this._response.getError().setErrorMessage(repoUserResponse.error.message, repoUserResponse.error.technicalMessage)
                    this._response.getError().setStatusCode(repoUserResponse.error.statuscode)
                    if(process.env.ENV.toLocaleLowerCase() == "dev"){
                        console.log(repoUserResponse.error)
                    }
                }
            }else{
                this._response.getError().setErrorMessage(repoRolesResponse.error.message, repoRolesResponse.error.technicalMessage)
                this._response.getError().setStatusCode(repoRolesResponse.error.statuscode)
                if(process.env.ENV.toLocaleLowerCase() == "dev"){
                    console.log(repoRolesResponse.error)
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

        let repoResponse = await userRepo.getUserRolesbyPkAsync(id,false)
        if(repoResponse.success){
            this._response.setData(repoResponse.data)
        }else{
            console.log(repoResponse)
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