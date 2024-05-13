const BaseRepository = require("./BaseRepository");

class RoleRepository extends BaseRepository{
    constructor(context, entity){
        super(context, entity)
    }
}

module.exports = RoleRepository