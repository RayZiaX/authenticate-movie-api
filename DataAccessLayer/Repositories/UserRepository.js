const BaseRepository = require('./BaseRepository')
const ResponseRepository = require('./Responses/ResponseRepository')

class UserRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity,"user")
    }

    async createUserWithRolesAsync(value,idRoles){
        let response = new ResponseRepository()
        try {
            let result = await this.createAsync(value,false)
            if(result.success){
                await Promise.all(idRoles.map(roleId => {
                    return this.context.getUsersRoles().create({idUser: result.data.idUser,idRole:roleId})
                }))
                result = await this.getUserRolesbyPkAsync(result.data.idUser,false)

                if(result.success){
                    response.setData(result.data)
                }else{
                    response.getError().setErrorMessage(result.error.message,result.error.technicalMessage)
                    response.getError().setStatusCode(result.error.statuscode)
                }
            }else{
                response.getError().setErrorMessage(result.error.message,result.error.technicalMessage)
                response.getError().setStatusCode(result.error.statuscode)
            }
        } catch (error) {
            response = this._setServerError(response,`Une erreur a été rencontré durant la création de ${this.entityType}`,error)
        }

        return this._sendResponse(response)
    }

    async getUserRolesbyPkAsync(primaryKey,track = false){
        let response = new ResponseRepository()
        try {
            let options= {
                include: [
                    {
                        model: this.context.getRoles(),
                        as: "roles",
                        through: {
                            attributes: []
                        },
                        attributes: ['idRole','nameRole']
                    }
                ]
            }
            let result = await this.getByPrimaryKeyAsync(primaryKey,options,track)
            if(result.success){
                response.setData(result.data)
            }else{
                response.getError().setErrorMessage(result.error.message,result.error.technicalMessage)
                response.getError().setStatusCode(result.error.statuscode)
            }
        } catch (error) {
            response = this._setServerError(response,`Une erreur a été rencontré durant la récupération de ${this.entityType}`,error);
        }
        return this._sendResponse(response)
    }

    async getUserRolesByCriteriaAsync(criteria, track = false){
        let response = new ResponseRepository()
        try {
            let result = await this.entity.findOne({where:criteria})
            if(result != null){
                result = await this.getUserRolesbyPkAsync(result.idUser,track)
                if(result.success){
                    response.setData(result.data)
                }else{
                    response.getError().setErrorMessage(result.error.message,result.error.technicalMessage)
                    response.getError().setStatusCode(result.error.statuscode)
                }
            }else{
                response.getError().setErrorMessage(`aucune données n'a été récupérer`,"not found")
                response.getError().setStatusCode(404)
            }
        } catch (error) {
            response = this._setServerError(response,`Une erreur a été rencontré durant la récupération de ${this.entityType}`,error);
        }

        return this._sendResponse(response)
    }

    async updateUserAsync({firstname,lastname,login,status}, roles,primaryKey,changeRoles = false, track=false){
        let response = new ResponseRepository()
        try {
            let oldEntity = await this.getByPrimaryKeyAsync(primaryKey,undefined,true)
            if(oldEntity.success){
                oldEntity = oldEntity.data
                oldEntity.nameUser = firstname
                oldEntity.firstnameUser = lastname
                oldEntity.loginUser = login
                oldEntity.status = status

                await oldEntity.save()
                
                if(changeRoles && (roles != undefined && Array.isArray(roles))){
                    await this.context.getUsersRoles().destroy({where: {idUser: primaryKey}})

                    await Promise.all(roles.map(roleId => {
                        return this.context.getUsersRoles().create({idUser: primaryKey,idRole: roleId})
                    }))
                }

                let changeEntity = await this.getUserRolesbyPkAsync(primaryKey,track)
                if(changeEntity.success){
                    response.setData(changeEntity.data)
                }else{
                    response.getError().setErrorMessage(changeEntity.error.message, changeEntity.error.technicalMessage)
                    response.getError().setStatusCode(changeEntity.error.statuscode)
                }
            }else{
                response.getError().setErrorMessage(`l'entité ${this.entityType} n'a pas été trouvé`, "entity not found")
                response.getError().setStatusCode(404)
            }
        } catch (error) {
            response = this._setServerError(response,`Une erreur a été rencontré durant la modification de ${this.entityType}`, error)
        }

        return this._sendResponse(response)
    }
}

module.exports = UserRepository