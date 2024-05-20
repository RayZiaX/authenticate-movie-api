module.exports = {
    models:{
        accounts:{
            bodies:{
                Default: require('./Accounts/Bodies/DefaultBodyAccount')
            },
            responses:{
                Default: require('./Accounts/Responses/DefaultAccountResponse')
            }
        },
        tokens:{
            bodies:{
                Login: require('./Tokens/Bodies/TokenLogin')
            },
            responses:{
                BaseToken: require('./Tokens/Responses/BaseTokenResponse'),
                RefreshToken: require('./Tokens/Responses/RefreshTokenResponse')
            }
        },
        Error: require('./ErrorModel')
    }
}