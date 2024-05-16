const { services } = require("../../BusinessLayer/Services/index")
const jwt = require('jsonwebtoken');

function authenticate(req,res,next){
    
    if(req.headers == undefined || req.headers == null){
        return res.status(401).json("Un authorize")
    }

    if(req.headers['authorization'] == undefined || req.headers['authorization'] == null){
        return res.status(401).json("Un authorize")
    }
    
    let authorization = req.headers['authorization'].split(' ')
    if(authorization[0].toLowerCase() === "bearer" && (authorization[1] != undefined || authorization[1] != null) && authorization[1] != ""){
        next()
    }else{
        return res.status(401).json("Un authorize")
    }
}

async function readToken(req,res,next){
    let validToken = await tokenValid(req)

    if(validToken.validate){
        let token = validToken.token
        let clearToken = jwt.decode(token, process.env.JWT_KEY)
        req.user = {}
        req.user.id = clearToken.idUser
        if(clearToken.roles == undefined && clearToken.roles == null){
            return res.status(400).json("bad request")
        }
        req.user.roles = {
            isAdmin: false,
            isUser: false,
            isGest: false,
        }
        req.user.roles.isAdmin = clearToken.roles.find((role) => role.idRole == 1) != undefined
        req.user.roles.isUser = clearToken.roles.find((role) => role.idRole == 2) != undefined
        req.user.roles.isGest = clearToken.roles.find((role) => role.idRole == 3) != undefined
        next()
    }else{
        return  res.status(422).json("Invalide connexion")
    }
}

function isAdmin(req,res,next){
    if(req.user.roles.isAdmin){
        next()
    }else{
        res.status(403).json("Vous devez êtres administrateur")
    }
}

function isNotGest(req,res,next){
    if(!req.user.roles.isGest){
        next()
    }else{
        res.status(403).json("Vous devez avoir plus de droit")
    }
}

async function tokenValid(req){
    if((req.headers == undefined || req.headers == null) && (req.headers['authorization'] == undefined || req.headers['authorization'] == null)){
        return res.status(400).json("bad request")
    }
    let authorization = req.headers['authorization'].split(' ')
    let responseValidateToken = await new services.AuthService().validateToken(authorization[1])
    if(responseValidateToken.success){
        return {validate: true, token: responseValidateToken.data.accessToken}
    }else{
        return {validate: false}
    }
}


module.exports = {authenticate,readToken,isAdmin,isNotGest}