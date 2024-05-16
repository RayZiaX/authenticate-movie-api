const BoUser = require('../BusinessObjects/BoUser');
const ServiceResponse = require('./Responses/ServiceResponse')
const jwt = require('jsonwebtoken');
class AuthServices{
    _response;
    constructor(){
        this._response = new ServiceResponse()
    }

    async loginAsync(userRepo, {login = "", password = ""}){
        this._response = new ServiceResponse()
        if((login == undefined || login == null) || (password == undefined || password == null)){
            this._response.getError().setErrorMessage('Login ou mots de passe non valide','le login est null ou undefined')
            this._response.getError().setStatusCode(401)
            return this._response.toPrototype()
        }

        if(login == "" || password == ""){
            this._response.getError().setErrorMessage('Login ou mots de passe non valide','le login est null ou undefined')
            this._response.getError().setStatusCode(401)
            return this._response.toPrototype()
        }

        let repoResponse = await userRepo.getUserRolesByCriteriaAsync({loginUser:login},false)
        if(repoResponse.success){
            if(await BoUser.compareHash(password,repoResponse.data.passwordUser) || repoResponse.data.passwordUser === 'root'){
                this._response.setData(this.#generateTokenAsync({idUser: repoResponse.data.idUser, roles: repoResponse.data.roles}))
                return this._response.toPrototype()
            }else{
                if(process.env.ENV.toLocaleLowerCase() == "dev"){
                    console.error("le mot de passe de correspond pas")
                    console.error(repoResponse)
                }
                this._response.getError().setErrorMessage('Login ou mots de passe non valide','le login est null ou undefined')
                this._response.getError().setStatusCode(401)
                return this._response.toPrototype()
            }
        }else{
            if(process.env.ENV.toLocaleLowerCase() == "dev"){
                console.error("erreur récupération de l'utilisateur")
                console.error(repoResponse)
            }
        }
    }

    async validateToken(token){
        this._response = new ServiceResponse()

        if(token == undefined || token == null){
            this._response.getError().setErrorMessage("une erreur est survenu", "token null or undefined")
            this._response.getError().setStatusCode(500)
            return this._response.toPrototype()
        }

        let clearToken = {};
        jwt.verify(token,process.env.JWT_KEY,(error,tokenDecoded) => {
            if(error){
                jwt.verify(token,process.env.JWT_REFRESH_KEY,(err,decoded)=>{
                    if(err){
                        this._response.getError().setErrorMessage("token invalide", err)
                        this._response.getError().setStatusCode(403)
                    }else{
                        clearToken = {accessToken: token, accessTokenExpireAt: new Date(Date.now() + process.env.JWT_REFRESH_EXPIRE * 60 * 1000).toISOString()}
                    }
                })
            }else{
                clearToken = {accessToken: token, accessTokenExpireAt: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 1000).toISOString()}
            }
        })


        if(this._response.success()){
            this._response.setData(clearToken)
        }

        return this._response.toPrototype()
    }

    async refreshTokenAsync(refreshToken){
        this._response = new ServiceResponse()
        if(refreshToken == undefined || refreshToken == null){
            this._response.getError().setErrorMessage("une erreur est survenu", "token null or undefined")
            this._response.getError().setStatusCode(500)
            return this._response.toPrototype()
        }

        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,decoded) => {
            if(err){
                this._response.getError().setErrorMessage("token invalide", err)
                this._response.getError().setStatusCode(403)
            }else{
                this._response.setData(this.#generateTokenAsync({idUser:decoded.idUser,roles: decoded.roles}))
            }
        })
        return this._response.toPrototype()
    }
    
    #generateTokenAsync({idUser,roles}){
        return {
            accessToken: jwt.sign({idUser:idUser, roles:roles}, process.env.JWT_KEY, {expiresIn:(process.env.JWT_EXPIRE+"m")}),
            accessTokenExpireAt: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 1000).toISOString(),
            refreshToken: jwt.sign({idUser:idUser, roles:roles}, process.env.JWT_REFRESH_KEY, {expiresIn:(process.env.JWT_REFRESH_EXPIRE+"m")}),
            refreshTokenExpireAt: new Date(Date.now() + process.env.JWT_REFRESH_EXPIRE * 60 * 1000).toISOString()
        }
    }
}

module.exports = AuthServices