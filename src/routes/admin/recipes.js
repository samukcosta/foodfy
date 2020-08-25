const express = require('express')
const routes = express.Router()
const {isLoggedRedirectToUsers, onlyUsers, isAdmin} = require("../../config/middlewares/session")
const multer = require("../../config/middlewares/multer")
const recipesAdmin = require("../../app/admin/controllers/recipes_admin")

routes.get("/", onlyUsers,  recipesAdmin.index)
routes.get("/create", onlyUsers, recipesAdmin.create);
routes.get("/:id", onlyUsers, recipesAdmin.detail)
routes.get("/:id/edit", onlyUsers, recipesAdmin.edit)

routes.post("/", multer.array("image", 5), recipesAdmin.post)
routes.put("/", multer.array("image", 5), recipesAdmin.put)
routes.delete("/", recipesAdmin.delete)

module.exports = routes