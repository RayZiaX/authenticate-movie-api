const router = require('express').Router()
const { controllers } = require('../Controllers/index')
const { services } = require("../../BusinessLayer/Services/index")
const { middlewares:{policies} } = require('../Middleware/index')
const accountController = new controllers.Account(new services.Account())

router.post('/account', policies.authenticate,policies.readToken,policies.isAdmin,accountController.createAccountAsync.bind(accountController))
router.get('/account/:uid', policies.authenticate,policies.readToken,policies.isNotGest, accountController.getAccountByIdAsync.bind(accountController))
router.put('/account/:uid', policies.authenticate,policies.readToken,policies.isNotGest,accountController.updateAccountByIdAsync.bind(accountController))
module.exports = router