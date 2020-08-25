const express = require('express')
const routes = express.Router()
const multer = require('../../config/middlewares/multer')
const {isLoggedRedirectToUsers, onlyUsers, isAdmin} = require("../../config/middlewares/session")
const UsersController = require('../../app/admin/controllers/usersController')
const UserValidator = require('../../app/admin/validators/user')
const chefsAdmin = require("../../app/admin/controllers/chefs_admin")


routes.get('/', onlyUsers, UserValidator.show, function(req, res){ return res.redirect('/admin/profile')})
routes.get('/profiles', isAdmin, UsersController.showAllUsers)
routes.get('/register', onlyUsers, isAdmin, UsersController.create)
routes.get("/:id", onlyUsers, isAdmin, UsersController.showUser)

routes.post('/register', isAdmin, UserValidator.post, UsersController.post)
routes.put('/profiles', isAdmin, UsersController.updateUser)
routes.delete('/profiles', isAdmin, UsersController.deleteUser)

routes.post("/", multer.array("image", 1), chefsAdmin.post)
routes.put("/", multer.array("image", 1), chefsAdmin.put)
routes.delete("/", chefsAdmin.delete)

module.exports = routes