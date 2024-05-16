const { v4 } = require('uuid');
const BoResponse = require('./BoResponses/BoResponse');
const bcrypt = require('bcryptjs')
class BoUser{
    #firstname;
    #name;
    #login;
    #password;
    #id;
    constructor({idUser ="", firstname = "", name = "", login = "", password = ""}){
        this.#firstname = firstname
        this.#name = name
        this.#login = login
        this.#password = password
        this.#id = idUser
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

        return response
    }

    checkDatas(){
        let response = new BoResponse();
        if(!this.checkId().success()){
            response.getError().setErrorMessage("les données de l'utilisateur ne sont pas conforme")
            response.getError().setStatusCode(400)
        }

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

    /**
     * Méthode qui permet de générer un mot de passe à l'utilisateur 
     */
    async #generatePasswordAsync(){
        let clearPwd = v4().replace('-','').substring(0,12)
        return await bcrypt.hash(clearPwd,process.env.HASH_SALT)
    }

    #generateUuid(){
        return v4()
    }

    async toCreateUser(){
        return {
            idUser: this.#generateUuid(),
            firstnameUser:this.#firstname,
            nameUser:this.#name,
            loginUser:this.#login,
            passwordUser: await this.#generatePasswordAsync(),
        }
    }

    toPrototype(){
        let prototype = {
           id: this.#id,
           firstname: this.#firstname,
           lastname: this.#name,
           login: this.#login
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
        }

        return response 
    }

    static checkId(id){
        let reponse = new BoResponse()
        
        if(id == null || id == undefined){
            reponse.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "l'identifiant du compte ne peux pas être null ou undefined")
            reponse.getError().setStatusCode(401)
        }

        if(typeof(id) != 'string'){
            reponse.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "le type de l'identifiant du compte n'est pas conforme")
            reponse.getError().setStatusCode(401)
        }

        if(id === ""){
            reponse.getError().setErrorMessage("Une erreur à été rencontré durant la récupération du compte", "l'identifiant ne peux pas être vide")
            reponse.getError().setStatusCode(401)
        }
        return reponse
    }
    //#endregion
}

module.exports = BoUser