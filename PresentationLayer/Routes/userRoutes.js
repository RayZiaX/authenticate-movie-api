const router = require('express').Router()
const { controllers } = require('../Controllers/index')
const { services } = require("../../BusinessLayer/Services/index")
const { middlewares:{policies} } = require('../Middleware/index')
const userController = new controllers.User(new services.User())

router.post('/account', policies.authenticate,policies.readToken,policies.isAdmin,userController.createAccountAsync.bind(userController))
router.get('/account/:userId', policies.authenticate,policies.readToken,policies.isNotGest, userController.getAccountByIdAsync.bind(userController))
router.put('/account/:userId', policies.authenticate,policies.readToken,policies.isNotGest,userController.updateAccountByIdAsync.bind(userController))
module.exports = router