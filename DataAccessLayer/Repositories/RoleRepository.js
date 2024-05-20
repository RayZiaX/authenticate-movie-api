const { Op } = require("sequelize");
const BaseRepository = require("./BaseRepository");
const ResponseRepository = require('./Responses/ResponseRepository')
class RoleRepository extends BaseRepository{
    constructor(context, entity){
        super(context, entity, "role")
    }

    async existsRangeByIdsAsync(ids){
        let response = new ResponseRepository()
        try {
            let dbCount = await this.entity.count({where: {
                    idRole:{[Op.in]:ids}
                }
            })

            if(dbCount === ids.length){
                response.setData("l'ensemble des données existe")
            }else{
                response.getError().setErrorMessage("certaines données n'existe pas", `il manque certains rôles dans la base de données, résultat: ${dbCount} contre ${ids.length}`)
                response.getError().getStatusCode(404)
            }
        } catch (error) {
           response = this._setServerError(response,`Une erreur a été rencontré durant vérification d'existance de ${this.entityType}`,error)
        }

        return this._sendResponse(response)
    }
}

module.exports = RoleRepository