const BaseController = require('./BaseController')
const {models:{accounts}} = require('../Models/index')
class UserController extends BaseController{
    constructor(service){
        super(service)
    }

    async createAccountAsync(req,res){
        let body = new accounts.bodies.Default(req.body)
        let serviceResponse = await this._service.createUserAsync(req.repositories,body.toPrototype())
        let responseBody = {}
        if(serviceResponse.success){
            responseBody = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
            responseBody = serviceResponse.error
        }
        return res.status(serviceResponse.statuscode).json(responseBody)
    }

    async getAccountByIdAsync(req,res){
        let id = req.params.userId
        let serviceResponse = await this._service.getAccountByIdAsync(req.repositories.getUserRepository(), id,req.user)
        let value = {}
        if(serviceResponse.success){
            value = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
            value = serviceResponse.error
        }
        return this._sendResponse(res,serviceResponse.statuscode,value)
    }

    async updateAccountByIdAsync(req,res){

        let body = new accounts.bodies.Default(req.body)

        let serviceResponse = await this._service.updateAccountByIdAsync(req.repositories.getUserRepository(),body.toPrototype(),req.params.userId,req.user)
        let value = {}
        
        if(serviceResponse.success){
            value = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
            value = serviceResponse.error
        }
        return this._sendResponse(res,serviceResponse.statuscode,value)
    }
}

module.exports = UserController