const fs = require("fs")
const {lineBreak} = require("../../../lib/utils")
const RecipesPublic = require("../models/RecipesPublic")

module.exports = {
    show(req,res){
        const {filter} = req.query
    
        let params = {}
        if (filter) params = {filter}
    
        RecipesPublic.index(params, function(recipes){
            return res.render("public/recipes/recipes", {recipes, filter})
        })
    },
    detail(req,res){
        const {id} = req.params
    
        RecipesPublic.find(id, function(recipes){
            recipes.information = lineBreak(recipes.information).fh
    
            return res.render("public/recipes/recipeDetail", {recipes}) 
        })
    }
}