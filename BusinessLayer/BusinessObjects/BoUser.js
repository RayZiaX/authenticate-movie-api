const { v4 } = require('uuid');
const BoResponse = require('./BoResponses/BoResponse');
const bcrypt = require('bcryptjs')
class BoUser{
    #firstname;
    #name;
    #login;
    #password;
    #id;
    #status;
    #roles

    constructor({idUser ="", firstname = "", name = "", login = "", password = "", status="open", roles = null}){
        this.#firstname = firstname
        this.#name = name
        this.#login = login
        this.#password = password
        this.#id = idUser
        this.#status = status
        this.#roles = roles
    }
//#region Méthodes de vérification
    checkStatus(){
        return BoUser.checkStatus(this.#status)
    }

    checkDatasToInsert(){
        let response = new BoResponse();

        if(!this.checkName().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkFirstname().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkLogin().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkStatus().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkRoles().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

        return response
    }

    checkDatas(){
        let response = new BoResponse();
        if(!this.checkId().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","l'identifiant n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkName().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","le nom n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkFirstname().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","le prénom n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkLogin().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","le login n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkStatus().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","le status n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        if(!this.checkRoles().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme","les roles n'est pas conforme")
            response.getError().setStatusCode(400)
        }

        return response
    }

    /**
     * Méthode qui permet d'appliquer les règles métier de conformité pour l'objet métier à sa propriété name
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    checkName() {
        return BoUser.checkName(this.#name)
    }
    
    /**
     * Méthode qui permet d'appliquer les règles métier de conformité pour l'objet métier à sa propriété firstname
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    checkFirstname(){
        return BoUser.checkFirstname(this.#firstname)
    }
    
    /**
     * Méthode qui permet d'appliquer les règles métier de conformité pour l'objet métier à sa propriété login
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    checkLogin(){
        return BoUser.checkLogin(this.#login)
    }

    checkId(){
        return BoUser.checkId(this.#id)
    }

    checkRoles(){
        return BoUser.checkRoles(this.#roles)
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

    async toCreateUser(){
        let password = this.#generatePassword()
        return {
            idUser: this.#generateUuid(),
            firstnameUser:this.#firstname,
            nameUser:this.#name,
            loginUser:this.#login,
            passwordUser: await bcrypt.hash(password,process.env.HASH_SALT.length),
            clearPassword: password,
            status: this.#status ? this.#status : "open"
        }
    }

    toPrototype(){
        let prototype = {
           id: this.#id,
           firstname: this.#firstname,
           lastname: this.#name,
           login: this.#login,
           status: this.#status,
           roles: this.#roles
        }

        return prototype
    }

    //#region méthode statique

    /**
     * Méthode static qui applique les règles métier de conformité pour le nom du détenteur de ce compte
     * @param {le nom de l'utilisateur détenant ce compte} name 
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    static checkName(name){
        let response = new BoResponse()
        if(name == null || name == undefined || typeof(name) !== 'string' || name == ""){
            response.getError().setErrorMessage("le nom du compte n'est pas au bon format")
            response.getError().setStatusCode(400)
            return response
        }
        return response
    }

    /**
     * Méthode static qui applique les règles métier de conformité pour le prénom du détenteur de ce compte
     * @param {le prénom de l'utilisateur détenant ce compte} firstname 
     * @returns une réponse de type BoResponse qui valide ou non la vérification
     */
    static checkFirstname(firstname){
        let response = new BoResponse()
        if(firstname == null || firstname == undefined|| typeof(firstname) !== 'string'  || firstname == ""){
            response.getError().setErrorMessage("le prénom du compte n'est pas valide")
            response.getError().setStatusCode(400)
            return response 
        }
        return response
    }

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

module.exports = BoUser