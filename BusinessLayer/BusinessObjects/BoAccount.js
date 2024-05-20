const { v4 } = require('uuid');
const BoResponse = require('./BoResponses/BoResponse');
const bcrypt = require('bcryptjs')
class BoAccount{
    #login;
    #password;
    #id;
    #status;
    #roles

    constructor({idAccount ="", login = "", password = "", status="open", roles = null}){
        this.#login = login
        this.#password = password
        this.#id = idAccount
        this.#status = status
        this.#roles = roles
    }
//#region Méthodes de vérification

    checkDatasToInsert(){
        let response = new BoResponse();

        if(!this.checkLogin().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le login n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkPassword().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le mot de passe n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkStatus().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le status n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkRoles().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","les roles ne sont pas conforme")
            response.getError().setStatusCode(400)
        }
        return response
    }

    checkDatas(){
        let response = new BoResponse();
        if(!this.checkId().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","l'identifiant n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkPassword().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le mot de passe n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkLogin().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le login n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkStatus().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","le status n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkRoles().success()){
            response.getError().setErrorMessage("les données du compte ne sont pas conforme","les roles n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        return response
    }
    
    checkStatus(){
        return BoAccount.checkStatus(this.#status)
    }
    
    /**
     * Méthode qui permet d'appliquer les règles métier de conformité pour l'objet métier à sa propriété login
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    checkLogin(){
        return BoAccount.checkLogin(this.#login)
    }

    checkId(){
        return BoAccount.checkId(this.#id)
    }

    checkPassword(){
        return BoAccount.checkPassword(this.#password)
    }

    checkRoles(){
        return BoAccount.checkRoles(this.#roles)
    }

//#endregion

    /**
     * Méthode qui permet de générer un mot de passe à l'utilisateur 
     */
    #generatePassword(){
        return v4().replace('-','').substring(0,12) 
    }

    #generateUuid(){
        return v4()
    }

    toCreateAccount(){
        return {
            idAccount: this.#generateUuid(),
            loginAccount:this.#login,
            passwordAccount: this.#password,
            status: this.#status ? this.#status : "open"
        }
    }

    toPrototype(){
        let prototype = {
           id: this.#id,
           login: this.#login,
           password: this.#password,
           status: this.#status,
           roles: this.#roles
        }

        return prototype
    }

    //#region méthode statique

    /**
     * Méthode qui applique les règles métier de conformité pour le login du compte utilisateur
     * @param {le login du compte utilisateur} login 
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    static checkLogin(login){
        let response = new BoResponse()
        if(login == null || login == undefined || typeof(login) !== 'string' || login == ""){
            response.getError().setErrorMessage("le login n'est pas au bon format")
            response.getError().setStatusCode(400)
            return response
        }

        return response 
    }

    static checkPassword(password){
        let response = new BoResponse()
        
        if(password == null || password == undefined){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la vérification du mots de passe", "le mot de passe du compte ne peux pas être null ou undefined")
            response.getError().setStatusCode(401)
            return response
        }

        if(typeof(password) != 'string'){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la vérification du mots de passe", "le type du mot de passe du compte n'est pas conforme")
            response.getError().setStatusCode(401)
            return response
        }

        if(password === ""){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la vérification du mots de passe", "le mot de passe ne peux pas être vide")
            response.getError().setStatusCode(401)
            return response
        }
        return response
    }

    static checkId(id){
        let response = new BoResponse()
        
        if(id == null || id == undefined){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "l'identifiant du compte ne peux pas être null ou undefined")
            response.getError().setStatusCode(401)
            return response
        }

        if(typeof(id) != 'string'){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "le type de l'identifiant du compte n'est pas conforme")
            response.getError().setStatusCode(401)
            return response
        }

        if(id === ""){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "l'identifiant ne peux pas être vide")
            response.getError().setStatusCode(401)
            return response
        }
        return response
    }

    static checkStatus(status){
        let response = new BoResponse()
        if(status == undefined || status == null){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "l'identifiant du compte ne peux pas être null ou undefined")
            response.getError().setStatusCode(401)
            return response
        }

        if(typeof(status) != 'string'){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "le type de l'identifiant du compte n'est pas conforme")
            response.getError().setStatusCode(401)
            return response
        }

        if(status.toLowerCase() !== 'open' && status.toLowerCase() !== 'closed'){
            response.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "le type de l'identifiant du compte n'est pas conforme")
            response.getError().setStatusCode(401)
            return response
        }
        return response
    }

    static checkRoles(idRoles){
        let response = new BoResponse()
        if(idRoles == undefined || idRoles == null){
            response.getError().setErrorMessage("Une erreur à été rencontré la vérification des roles", "un utilisateur doit avoir au moins le rôle 'Gest'")
            response.getError().setStatusCode(401)
            return response
        }

        if(!Array.isArray(idRoles)){
            response.getError().setErrorMessage("Une erreur à été rencontré la vérification des roles", "la variable 'roles' doit être de type array")
            response.getError().setStatusCode(401)
            return response
        }

        if(idRoles.find((idRole) => idRole == 1) != undefined && idRoles.find((idRole) => idRole == 2) == undefined){
            response.getError().setErrorMessage("Une erreur à été rencontré la vérification des roles", "le rôle administrateur doit avoir le rôle 'utilisateur'")
            response.getError().setStatusCode(401)
            return response
        }
        return response
    }

    static async compareHash(str,hash){
        return await bcrypt.compare(str,hash)
    }

    //#endregion
}

module.exports = BoAccount