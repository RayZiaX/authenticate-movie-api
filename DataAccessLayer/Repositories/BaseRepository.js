const { where } = require("sequelize")
const ResponseRepository = require('./Responses/ResponseRepository')
class BaseRepository{
    constructor(context,entity,entityType){
        if((context == undefined || context == null) || (entity == undefined || entity == null)){
            throw new Error("A repository cannot have context or entity null or undefined")
        }
        this.context = context
        this.entity = entity
        this.entityType = entityType
    }


    /**
     * Méthode qui permet de récupérer une entité selon sa clé primaire
     * @param {représente la clé primaire de l'entité} primaryKey 
     * @param {indique si l'orm doit traquer l'entité ou pas} track 
     * @returns une réponse de l'action du répository
     */
    async getByPrimaryKeyAsync(primaryKey, track = false){
        let response = new ResponseRepository()
        try {
            let data = await this.entity.findByPk(primaryKey)
            if(data == null){
                response.getError().setErrorMessage(`aucun ${this.entityType} n'a été trouvé`,`Message technique: aucun ${this.entityType} n'a été trouvé`)
                response.getError().setStatusCode(404)
            }else{
                if(!track){
                    data = data.toJSON()
                }
                response.setData(data)
            }
        } catch (error) {
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la récupération de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }
        return this._sendResponse(response)
    }

    /**
     * Méthode qui permet de créer une entité
     * @param {*} value 
     * @param {indique si l'orm doit traquer l'entité ou pas} track 
     * @returns une réponse de l'action du répository
     */
    async createAsync(value, track = false){
        let response = new ResponseRepository()
        try {
            let entityCreate = await this.entity.create(value)
            if(!track){
                entityCreate = entityCreate.toJSON()
            }
            response.setData(entityCreate)
        } catch (error) {
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la création de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }
        return this._sendResponse(response)
    }

    /**
     * Méthode qui permet de supprimer une entité en base selon les critères données
     * @param {les critères de selection pour la suppression des entités} criteria
     * @returns une réponse de l'action du répository
     */
    async deleteAsync(criteria){
        let response = new ResponseRepository()
        try {
            let deleteEntity = await this.entity.destroy({ where: criteria})
            if(deleteEntity > 0){
                response.setData(`l'entité ${typeof(this.entity)} a été supprimé`)
            }else{
                response.getError().setErrorMessage(`l'entité ${this.entityType} n'a pas été supprimé`, "entity not found")
                response.getError().setStatusCode(404)
            }
        } catch (error) {
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la suppression de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }
        return this._sendResponse(response)
    }

    /**
     * Méthode qui permet de mettre à jour plusieurs entité en base selon des critères
     * @param {les champs à modifier de l'entité} fields
     * @param {les critères pour la selection des entités à modifier} criteria
     * @param {indique si l'orm doit traquer l'entité ou pas} track 
     * @returns une réponse de l'action du répository
     */
    async bulkUpdateAsync(fields,criteria, track = false){
        let response = new ResponseRepository()
        try {
            let updateEntity = await this.entity.update({fields}, {where: criteria})

            if(updateEntity[0] > 0){
                let changeEntity = await this.entity.findAll({where:criteria})
                if(!track){
                    changeEntity = changeEntity.toJSON()
                }
                response.setData(changeEntity)
            }else{
                response.getError().setErrorMessage(`l'entité ${this.entityType} n'a pas été modifié`)
                response.getError().setStatusCode(404)
            }
        } catch (error) {
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la modification de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }
        return this._sendResponse(response)
    }

    async existsAsync(criteria){
        let response = new ResponseRepository()
        try {
            let e = await this.entity.findOne({where: criteria})

            if(e != null){
                response.setData({message: `l'entité ${this.entityType} a été trouvé`})
            }else{
                response.getError().setErrorMessage(`l'entité ${this.entityType} n'a pas été trouvé`)
                response.getError().setStatusCode(404)
            }
        } catch (error) {
            response.getError().setErrorMessage(`Une erreur a été rencontré durant la vérification de l'existance de ${this.entityType}`, error)
            response.getError().setStatusCode(500)
        }

        return this._sendResponse(response)
    }

    _sendResponse(response){
        return response.toPrototype()
    }
}

module.exports = BaseRepository