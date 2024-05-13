const { where } = require("sequelize")

class BaseRepository{
    constructor(context,entity){
        if((context == undefined || context == null) || (entity == undefined || entity == null)){
            throw new Error("A repository cannot have context or entity null or undefined")
        }
        this.context = context
        this.entity = entity
        this.entityType = typeof(this.entity)
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
                response.error.setErrorMessage(`aucun ${typeof(this.entity)} n'a été trouvé`,`Message technique: aucun ${typeof(this.entity)} n'a été trouvé`)
                response.error.setStatusCode(404)
            }else{
                if(!track){
                    data = data.toJSON()
                }
                response.setData()
            }
        } catch (error) {
            response.setErrorMessage(`Une erreur a été rencontré durant la récupération de ${typeof(this.entity)}`, error)
            response.error.setStatusCode(500)
        }

        return this.#sendResponse(response)
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
            response.setErrorMessage(`Une erreur a été rencontré durant la création de ${typeof(this.entity)}`, error)
            response.error.setStatusCode(500)
        }
        return this.#sendResponse(response)
    }

    /**
     * Méthode qui permet de supprimer une entité en base selon les critères données
     * @param {les critères de selection pour la suppression des entités} criteria
     * @returns une réponse de l'action du répository
     */
    async deleteAsync(criteria){
        let response = new ResponseRepository()
        try {
            let deleteEntity = await this.entity.destroy({where: criteria})
            if(deleteEntity > 0){
                response.setData(`l'entité ${typeof(this.entity)} a été supprimé`)
            }else{
                response.error.setErrorMessage(`l'entité ${this.entityType} n'a pas été supprimé`, "entity not found")
                response.error.setStatusCode(404)
            }
        } catch (error) {
            response.setErrorMessage(`Une erreur a été rencontré durant la suppression de ${this.entityType}`, error)
            response.error.setStatusCode(500)
        }
        return this.#sendResponse(response)
    }

    /**
     * Méthode qui permet de mettre à jour une ou plusieurs entité(s) en base selon des critères
     * @param {les champs à modifier de l'entité} fields
     * @param {les critères pour la selection des entités à modifier} criteria
     * @param {indique si l'orm doit traquer l'entité ou pas} track 
     * @returns une réponse de l'action du répository
     */
    async updateAsync(fields,criteria, track = false){
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
                response.error.setErrorMessage(`l'entité ${this.entityType} n'a pas été modifié`)
                response.error.setStatusCode(404)
            }
        } catch (error) {
            response.setErrorMessage(`Une erreur a été rencontré durant la modification de ${this.entityType}`, error)
            response.error.setStatusCode(500)
        }
        return this.#sendResponse(response)
    }

    #sendResponse(response){
        return response.toPrototype()
    }
}

module.exports = BaseRepository