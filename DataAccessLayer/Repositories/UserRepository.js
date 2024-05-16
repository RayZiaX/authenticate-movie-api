const BaseRepository = require('./BaseRepository')
const ResponseRepository = require('./Responses/ResponseRepository')

class UserRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity,"user")
    }

    async updateUserAsync({firstname,lastname,login}, primaryKey, track=false){
        let response = new ResponseRepository()
        try {
            console.log({firstname,lastname,login})
            let oldEntity = await this.getByPrimaryKeyAsync(primaryKey,true)
            if(oldEntity.success){
                oldEntity = oldEntity.data
                oldEntity.nameUser = firstname
                oldEntity.firstnameUser = lastname
                oldEntity.loginUser = login

                await oldEntity.save()

                let changeEntity = await this.getByPrimaryKeyAsync(primaryKey,false)
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
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la suppression de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }

        return this._sendResponse(response)
    }
}

module.exports = UserRepository