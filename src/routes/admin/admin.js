const express = require('express')
const routes = express.Router()
const SessionController = require('../../app/admin/controllers/session_controller')
const SessionValidator = require('../../app/admin/validators/session')

const chefsAdmin = require("../../app/admin/controllers/chefs_admin")
const recipesAdmin = require('./recipes')
const profilesAdmin = require('./profile')
const userAdmin = require('./users')
const login = require('./login')

const {isLoggedRedirectToUsers, onlyUsers, isAdmin} = require("../../config/middlewares/session")

routes.get('/', function(req,res){
    return res.redirect('admin/profile')
})

routes.use('/', login)
routes.get("/chefs", onlyUsers, chefsAdmin.index)
routes.use('/recipes', recipesAdmin)
routes.use('/profile', profilesAdmin)
routes.use('/users', userAdmin)

module.exports = routes