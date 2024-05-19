class BaseTokenResponse{
    _accessToken
    _accessTokenExpireAt

    constructor({accessToken = "", accessTokenExpireAt = ""}){
        this._accessToken = accessToken
        this._accessTokenExpireAt = accessTokenExpireAt
    }

    toPrototype(){
        let prototype = {}
        if(this._accessToken != undefined && this._accessToken != ""){
            prototype.accessToken = this._accessToken
        }
        if(this._accessTokenExpireAt != undefined && this._accessTokenExpireAt != ""){
            prototype.accessTokenExpiresAt = this._accessTokenExpireAt
        }

        return prototype
    }
}

module.exports = BaseTokenResponse