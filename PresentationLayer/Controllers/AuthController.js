const BaseController = require("./BaseController")
const {models:{tokens},models:{Error}} = require('../Models/index')
class AuthController extends BaseController{
    constructor(service){
        super(service)
    }

    async loginAccountAsync(req,res){
        let requestBody = new tokens.bodies.Login(req.body)

        let serviceResponse = await this._service.loginAsync(req.repositories.getAccountRepository(),requestBody.toPrototype())
        const attempt = req.attemps[req.ip]
        let responseBody = {}
        let statuscode = 200
        if(serviceResponse.success){
            attempt.count = 0
            attempt.lastAttempt = null
            attempt.blockedCount = 0
            attempt.blockedUntil = null
            statuscode = 201
            responseBody = new tokens.responses.RefreshToken(serviceResponse.data).toPrototype()
        }else{
            attempt.count += 1
            attempt.lastAttempt = Date.now()
            if(attempt.count % process.env.BF_MAX_ATTEMPTS == 0){
                attempt.blockedCount++
                let duration = 0
                switch (attempt.blockedCount) {
                    case 1:
                        duration = process.env.BF_BLOCK_DURATION_FIRST * 60 * 1000
                        break;
                    case 2:
                        duration = process.env.BF_BLOCK_DURATION_SECOND * 60 * 1000
                        break;       
                    default:
                        duration = process.env.BF_BLOCK_DURATION_THIRD * 60 * 1000
                        break;
                }
                attempt.blockedUntil = Date.now() + duration
            }
            statuscode = 404
            responseBody = new Error(serviceResponse.error.message).toPrototype()
        }

        return this._sendResponse(res,statuscode,responseBody)
    }

    async refreshToken(req,res){
        let serviceResponse = await this._service.refreshTokenAsync(req.params.refreshToken)
        let responseBody = {}
        let statuscode = 200
        if(serviceResponse.success){
            statuscode = 200
            responseBody = new tokens.responses.RefreshToken(serviceResponse.data).toPrototype()
        }else{
            statuscode = 404
            responseBody = new Error(serviceResponse.error.message).toPrototype()
        }
        return this._sendResponse(res,statuscode,responseBody)
    }

    async accessToken(req,res){
        let serviceResponse = await this._service.validateToken(req.params.token)
        let responseBody = {}
        let statuscode = 200
        if(serviceResponse.success){
            statuscode = 200
            responseBody = new tokens.responses.RefreshToken(serviceResponse.data).toPrototype()
        }else{
            statuscode = 404
            responseBody = new Error(serviceResponse.error.message).toPrototype()
        }
        return this._sendResponse(res,statuscode,responseBody)
    }
}

module.exports = AuthController