const express = require('express')
const routes = express.Router()
const multer = require("./config/middlewares/multer")
const foodfyPublic = require("./app/public/controllers/foodfy")
const recipesPublic = require("./app/public/controllers/recipes_public")
const chefsPublic = require("./app/public/controllers/chefs_public")
const chefsAdmin = require("./app/admin/controllers/chefs_admin")
const recipesAdmin = require("./app/admin/controllers/recipes_admin")


///ROTAS PUBLICAS

routes.get('/', function(req,res){
    return res.redirect('foodfy')
})
routes.get("/foodfy", foodfyPublic.index)
routes.get("/foodfy/about", foodfyPublic.about)
routes.get("/foodfy/recipes", recipesPublic.show)
routes.get("/foodfy/recipes/:id", recipesPublic.detail)
routes.get("/foodfy/chefs", chefsPublic.index)
routes.get("/foodfy/search", function(req,res){
    return res.render("public/recipes/searchRecipes")
})

///ROUTES ADMIN

routes.get('/admin', function(req,res){
    return res.redirect('admin/recipes')
})
routes.get("/admin/recipes", recipesAdmin.index)
routes.get("/admin/recipes/create", recipesAdmin.create);
routes.get("/admin/recipes/:id", recipesAdmin.detail)
routes.get("/admin/recipes/:id/edit", recipesAdmin.edit)

routes.post("/admin/recipes", multer.array("image", 5), recipesAdmin.post)
routes.put("/admin/recipes", multer.array("image", 5), recipesAdmin.put)
routes.delete("/admin/recipes", recipesAdmin.delete)

routes.get("/admin/chefs", chefsAdmin.index)
routes.get("/admin/chefs/create", chefsAdmin.create)
routes.get("/admin/chefs/:id", chefsAdmin.detail)
routes.get("/admin/chefs/:id/edit", chefsAdmin.edit)

routes.post("/admin/chefs", multer.array("image", 1), chefsAdmin.post)
routes.put("/admin/chefs", multer.array("image", 1), chefsAdmin.put)
routes.delete("/admin/chefs", chefsAdmin.delete)

routes.use(function(req, res) {
    res.status(404).render("not-found")
})

module.exports = routes