const BaseController = require("./BaseController")

class AuthController extends BaseController{
    constructor(service){
        super(service)
    }

    async loginUserAsync(req,res){
        let data = {
            login: req.body.login,
            password: req.body.password
        }
        let serviceResponse = await this._service.loginAsync(req.repositories.getUserRepository(),data)

        if(serviceResponse.success){
            return res.status(serviceResponse.statuscode).json(serviceResponse.data)

        }else{
            return res.status(serviceResponse.statuscode).json(serviceResponse.error)
        }
    }

    async refreshToken(req,res){
        let serviceResponse = await this._service.refreshTokenAsync(req.params.refreshToken)
        if(serviceResponse.success){
            return res.status(serviceResponse.statuscode).json(serviceResponse.data)

        }else{
            return res.status(serviceResponse.statuscode).json(serviceResponse.error)
        }
    }

    async accessToken(req,res){
        let serviceResponse = await this._service.validateToken(req.params.token)

        if(serviceResponse.success){
            return res.status(serviceResponse.statuscode).json(serviceResponse.data)

        }else{
            return res.status(serviceResponse.statuscode).json(serviceResponse.error)
        }
    }
}

module.exports = AuthController