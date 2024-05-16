const BaseController = require('./BaseController')
const UserModel = require('../Models/UserModel')
class UserController extends BaseController{
    constructor(service){
        super(service)
    }

    async createAccountAsync(req,res){
        let data = {
            firstname: req.body.firstname,
            name: req.body.name,
            login: req.body.login,
            roles: req.body.idRoles
        }
        let serviceResponse = await this._service.createUserAsync(req.repositories,data)
        return res.status(serviceResponse.statuscode).json(serviceResponse)
    }

    async getAccountByIdAsync(req,res){
        let id = req.params.userId
        let serviceResponse = await this._service.getAccountByIdAsync(req.repositories.getUserRepository(), id)

        return res.status(serviceResponse.statuscode).json(serviceResponse)
    }

    async updateAccountByIdAsync(req,res){
        let data = {
            idUser: req.params.userId,
            firstname: req.body.firstname,
            name: req.body.name,
            login: req.body.login
        }

        let serviceResponse = await this._service.updateAccountByIdAsync(req.repositories.getUserRepository(),data)
        let value ={}
        
        if(serviceResponse.success){
            value = new UserModel(serviceResponse.data).toPrototype()
        }else{
            value = serviceResponse.error
        }
        return this._sendResponse(res,serviceResponse.statuscode,value)
    }
}

module.exports = UserController