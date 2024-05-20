const BaseController = require('./BaseController')
const {models:{accounts}, models:{Error}} = require('../Models/index')
class AccountController extends BaseController{
    constructor(service){
        super(service)
    }

    async createAccountAsync(req,res){
        let body = new accounts.bodies.Default(req.body)
        let serviceResponse = await this._service.createAccountAsync(req.repositories,body.toPrototype())
        let responseBody = {}
        let statuscode = 200
        if(serviceResponse.success){
            statuscode = 201
            responseBody = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
            statuscode = serviceResponse.statuscode
            responseBody = new Error(serviceResponse.error.message).toPrototype()
        }
        return res.status(statuscode).json(responseBody)
    }

    async getAccountByIdAsync(req,res){
        let id = req.params.uid
        let serviceResponse = await this._service.getAccountByIdAsync(req.repositories.getAccountRepository(), id,req.client)
        let value = {}
        let statuscode = 200
        if(serviceResponse.success){
        statuscode = 200
        value = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
        statuscode = serviceResponse.statuscode
        value = new Error(serviceResponse.error.message).toPrototype()
        }
        return this._sendResponse(res,statuscode,value)
    }

    async updateAccountByIdAsync(req,res){

        let body = new accounts.bodies.Default(req.body)

        let serviceResponse = await this._service.updateAccountByIdAsync(req.repositories.getAccountRepository(),body.toPrototype(),req.params.uid,req.client)
        let value = {}
        let statuscode = 200
        if(serviceResponse.success){
            statuscode = 201
            value = new accounts.responses.Default(serviceResponse.data).toPrototype()
        }else{
            statuscode = serviceResponse.statuscode
            value = new Error(serviceResponse.error.message).toPrototype()
        }
        return this._sendResponse(res,statuscode,value)
    }
}

module.exports = AccountController