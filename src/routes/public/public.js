const express = require('express')
const routes = express.Router()

const foodfyPublic = require("../../app/public/controllers/foodfy")
const recipesPublic = require("../../app/public/controllers/recipes_public")
const chefsPublic = require("../../app/public/controllers/chefs_public")


routes.get("/", foodfyPublic.index)
routes.get("/about", foodfyPublic.about)
routes.get("/recipes", recipesPublic.show)
routes.get("/recipes/:id", recipesPublic.detail)
routes.get("/chefs", chefsPublic.index)
routes.get("/search", function(req,res){
    return res.render("public/recipes/searchRecipes")
})

module.exports = routes