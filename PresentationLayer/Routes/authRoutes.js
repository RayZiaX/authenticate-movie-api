const router = require('express').Router()
const { controllers } = require('../Controllers/index')
const { services } = require("../../BusinessLayer/Services/index")

const authController = new controllers.Authentication(new services.AuthService())

router.post('/token',authController.loginUserAsync.bind(authController))
router.get('/validate/:token',authController.accessToken.bind(authController))
router.post('/refresh-token/:refreshToken/token',authController.refreshToken.bind(authController))
module.exports = router
