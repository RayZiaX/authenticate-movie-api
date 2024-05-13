const router = require('express').Router()
const { controllers } = require('../Controllers/index')
const { services } = require("../../BusinessLayer/Services/index")

const userController = new controllers.User(new services.User())

router.get('/account/:userId',)

module.exports = router