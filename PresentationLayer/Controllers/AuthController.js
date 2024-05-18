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
        const attempt = req.attemps[req.ip]
        console.log(attempt)
        if(serviceResponse.success){
            attempt.count = 0
            attempt.lastAttempt = null
            attempt.blockedCount = 0
            attempt.blockedUntil = null
            return res.status(serviceResponse.statuscode).json(serviceResponse.data)
        }else{
            attempt.count += 1
            attempt.lastAttempt = Date.now()
            if(attempt.count % process.env.BF_MAX_ATTEMPTS == 0){
                attempt.blockedCount++
                console.log(attempt)
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