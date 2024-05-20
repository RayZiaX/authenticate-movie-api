const Repositories = require('../../DataAccessLayer/Repositories/Repositories')
const dbContextInstance = require('../../DataAccessLayer/Contexts/MovieAuthContextInstance')

module.exports = async (req,res,next) => {
    try {
        await dbContextInstance.authenticate()
        await dbContextInstance.sync()
        req.repositories = new Repositories(dbContextInstance)
        next()
    } catch (error) {
        next(error)
        return
    }
}