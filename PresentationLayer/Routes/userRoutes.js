const router = require('express').Router()
const { controllers } = require('../Controllers/index')
const { services } = require("../../BusinessLayer/Services/index")

const userController = new controllers.User(new services.User())

router.post('/account', userController.createAccountAsync.bind(userController))
router.get('/account/:userId', userController.getAccountByIdAsync.bind(userController))
router.put('/account/:userId', userController.updateAccountByIdAsync.bind(userController))
module.exports = router