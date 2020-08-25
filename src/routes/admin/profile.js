const express = require('express')
const routes = express.Router()
const multer = require('../../config/middlewares/multer')
const {onlyUsers} = require("../../config/middlewares/session")
const profileController = require('../../app/admin/controllers/profileController')
const UserValidator = require('../../app/admin/validators/user')

routes.get('/', onlyUsers, UserValidator.show, profileController.detail)
routes.put('/', multer.array("image", 1), UserValidator.update, profileController.update)

module.exports = routes