const express = require('express')
const routes = express.Router()
const SessionController = require('../../app/admin/controllers/session_controller')
const SessionValidator = require('../../app/admin/validators/session')

const {isLoggedRedirectToUsers, onlyUsers, isAdmin} = require("../../config/middlewares/session")

routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

routes.get('/forgot-password', SessionController.forgotForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)

routes.get('/password-reset', SessionController.resetForm)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

module.exports = routes