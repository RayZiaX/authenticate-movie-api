const BaseRepository = require('./BaseRepository')

class UserRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity)
    }
}

module.exports = UserRepository