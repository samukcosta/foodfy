const fs = require("fs")
const RecipesAdmin = require("../models/RecipesAdmin")
const {lineBreak} = require("../../../lib/utils")

/*ADMIN*/

module.exports = {
    index(req,res){
        RecipesAdmin.index(function(recipes){
        return res.render('admin/recipes/index', {recipes})

        })
    },
    create(req,res){
        RecipesAdmin.teacherSelectOptions(function(chefs){
            return res.render('admin/recipes/create', {chefs})
        })
    },
    post(req,res){

        RecipesAdmin.create(req.body, function(){
            return res.redirect("/admin/recipes")
        })
    },
    detail(req, res) {
        const {id} = req.params

        RecipesAdmin.find(id, function(recipe){
            recipe.information = lineBreak(recipe.information).fh
            return res.render("admin/recipes/recipeDetail", {recipe})
        })  
    },
    edit(req,res){
        const {id} = req.params

        RecipesAdmin.find(id, function(recipe){
            RecipesAdmin.teacherSelectOptions(function(chefs){

                recipe.information = lineBreak(recipe.information).fu

                return res.render(`admin/recipes/edit`, {recipe, chefs})
            })
        })         
    },
    put(req,res){

        const {id} = req.body
        
        RecipesAdmin.update(req.body, function(){
            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    delete(req,res){
        const {id} = req.body

        RecipesAdmin.delete(id, function(){
            return res.redirect("/admin/recipes")
        })
    }
}