const { businessObjects : {BoAccount} } = require("../BusinessObjects/index")
const ServiceResponse = require('./Responses/ServiceResponse')


class AccountServices{
    _response;
    constructor(){
        this._response = new ServiceResponse()
    }

    async createAccountAsync(repositories, data){
        this._response = new ServiceResponse()
        let bo = new BoAccount(data)
        let boResponse = bo.checkDatasToInsert()
        if(boResponse.success()){
            let repoRolesResponse = await repositories.getRoleRepository().existsRangeByIdsAsync(data.roles)
            if(repoRolesResponse.success){
                let repoAccountResponse = await repositories.getAccountRepository().createAccountWithRolesAsync(bo.toCreateAccount(),data.roles)
                if(repoAccountResponse.success){
                    this._response.setData(repoAccountResponse.data)
                }else{
                    this._response.getError().setErrorMessage(repoAccountResponse.error.message, repoAccountResponse.error.technicalMessage)
                    this._response.getError().setStatusCode(repoAccountResponse.error.statuscode)
                    if(process.env.ENV.toLocaleLowerCase() == "dev"){
                        console.error(repoAccountResponse.error)
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
            if(process.env.ENV.toLocaleLowerCase() == "dev"){
                console.error(boResponse)
            }
            this._response.getError().setErrorMessage(boResponse.getError().getMessage(),)
            this._response.getError().setStatusCode(boResponse._getStatusCode())
        }
        return this._response.toPrototype()
    }

    async getAccountByIdAsync(accountRepo, id,client){
        this._response = new ServiceResponse()
        if(client.roles.isGest){
            this._response.getError().setErrorMessage("Aucun compte trouvé", "l'utilsateur connecté n'est pas un utilisateur ou un admin")
            this._response.getError().setStatusCode(400)
            return this._response.toPrototype()
        }
        if((client.id !== id && id !== "me") && client.roles.isUser && (!client.roles.isAdmin && !client.roles.isGest)){
            this._response.getError().setErrorMessage("Aucun compte trouvé", "l'utilsateur connecté n'est pas propriétaire du compte")
            this._response.getError().setStatusCode(403)
            return this._response.toPrototype()
        }

        if(id.toLowerCase() === "me" && client.roles.isUser){
            id = client.id
        }

        let boResponse = BoAccount.checkId()
        if(!boResponse.success){
            this._response.getError().setErrorMessage(boResponse.error.message, boResponse.error.technicalMessage)
            this._response.getError().setStatusCode(boResponse.statuscode)
            return this._response.toPrototype()
        }

        let repoResponse = await accountRepo.getAccountRolesbyPkAsync(id,false)
        if(repoResponse.success){
            this._response.setData(repoResponse.data)
        }else{
            this._response.getError().setErrorMessage(repoResponse.error.message)
            this._response.getError().setStatusCode(repoResponse.statuscode)
        }

        return this._response.toPrototype()
    }

    async updateAccountByIdAsync(accountRepo, data,id, client){
        this._response = new ServiceResponse()
        let changeRoles = false
        if(client == undefined || client.roles.isGest){
            this._response.getError().setErrorMessage("Vous devez êtres connecté", "l'utilisateur n'est pas authentifier ou n'a pas les droits")
            this._response.getError().setStatusCode(403)
            return this._response.toPrototype()
        }
        
        if((client.id !== id && id !== "me") && client.roles.isUser && (!client.roles.isAdmin && !client.roles.isGest)){
            this._response.getError().setErrorMessage("Aucun compte trouvé", "l'utilsateur connecté n'est pas propriétaire du compte")
            this._response.getError().setStatusCode(403)
            return this._response.toPrototype()
        }

        if(id.toLowerCase() === "me" && client.roles.isUser){
            data.idAccount = client.id
        }else if(client.roles.isUser){
            data.idAccount = id
        }
        let bo = new BoAccount(data)
        let boResponse = bo.checkDatas()
        if(boResponse.success()){
            let protoBo = bo.toPrototype()
            if(protoBo.id == client.id){
                changeRoles = false
            }else{
                changeRoles = client.roles.isAdmin
            }
            console.log(changeRoles)
            let repoResponse = await accountRepo.updateAccountAsync(protoBo,protoBo.roles,protoBo.id,changeRoles,false)
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
            if(process.env.ENV.toLocaleLowerCase() == "dev"){
                console.error("Erreur de la vérification")
                console.error(boResponse.toPrototype())
            }
            this._response.getError().setErrorMessage(boResponse.toPrototype().error.message)
            this._response.getError().setStatusCode(boResponse._getStatusCode())
        }
        
        return this._response.toPrototype()
    }
}

module.exports = AccountServices