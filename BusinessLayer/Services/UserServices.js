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
                let protoCreateUser = await bo.toCreateUser()
                let repoUserResponse = await repositories.getUserRepository().createUserWithRolesAsync(protoCreateUser,data.roles)
                if(repoUserResponse.success){
                    repoUserResponse.data.passwordUser = protoCreateUser.clearPassword
                    this._response.setData(repoUserResponse.data)
                }else{
                    this._response.getError().setErrorMessage(repoUserResponse.error.message, repoUserResponse.error.technicalMessage)
                    this._response.getError().setStatusCode(repoUserResponse.error.statuscode)
                    if(process.env.ENV.toLocaleLowerCase() == "dev"){
                        console.error(repoUserResponse.error)
                    }
                }
            }else{
                this._response.getError().setErrorMessage(repoRolesResponse.error.message, repoRolesResponse.error.technicalMessage)
                this._response.getError().setStatusCode(repoRolesResponse.error.statuscode)
                if(process.env.ENV.toLocaleLowerCase() == "dev"){
                    console.error(repoRolesResponse.error)
                }
            }
        }else{
            this._response.getError().setErrorMessage()
            this._response.getError().setStatusCode(boResponse._getStatusCode())
        }
        
        return this._response.toPrototype()
    }

    async getAccountByIdAsync(userRepo, id,client){
        if(client.roles.isGest){
            this._response.getError().setErrorMessage("Aucun compte trouvé", "l'utilsateur connecté n'est pas un utilisateur ou un admin")
            this._response.getError().setStatusCode(400)
            return this._response.toPrototype()
        }

        if(client.id !== id && client.roles.isUser && (!client.roles.isAdmin && !client.roles.isGest)){
            this._response.getError().setErrorMessage("Aucun compte trouvé", "l'utilsateur connecté n'est pas propriétaire du compte")
            this._response.getError().setStatusCode(403)
            return this._response.toPrototype()
        }
        
        if(id.toLowerCase() === "" && client.roles.isUser){
            id = client.id
        }

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
                    console.error("Erreur dans l'update")
                    console.error(repoResponse.error)
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