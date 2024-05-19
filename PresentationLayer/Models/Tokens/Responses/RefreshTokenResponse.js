const BaseTokenResponse = require("./BaseTokenResponse")

class RefreshTokenResponse extends BaseTokenResponse{
    #refreshAccessToken
    #refreshAccessTokenExpireAt

    constructor({accessToken = "", accessTokenExpireAt = "",refreshToken = "", refreshTokenExpireAt = ""}){
        super({accessToken,accessTokenExpireAt})
        this.#refreshAccessToken = refreshToken
        this.#refreshAccessTokenExpireAt = refreshTokenExpireAt
    }

    toPrototype(){
        let prototype = super.toPrototype()
        if(this.#refreshAccessToken != undefined && this.#refreshAccessToken != ""){
            prototype.refreshToken = this.#refreshAccessToken
        }
        if(this.#refreshAccessTokenExpireAt != undefined && this.#refreshAccessTokenExpireAt != ""){
            prototype.refreshTokenExpiresAt = this.#refreshAccessTokenExpireAt
        }

        return prototype
    }
}

module.exports = RefreshTokenResponse