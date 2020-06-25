const {lineBreak} = require("../../../lib/utils")
const RecipesPublic = require("../models/RecipesPublic")

module.exports = {
    async show(req,res){
        const {filter} = req.query
    
        let params = {}
        if (filter) params = {filter}

        let results = await RecipesPublic.index(params)
        const recipes = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
    
        return res.render("public/recipes/recipes", {recipes, filter})
    },
    async detail(req,res){
        let results = await RecipesPublic.find(req.params.id)

        const recipes = results.rows[0]

        recipes.information = lineBreak(recipes.information).fh

        results = await RecipesPublic.imagesRecipe(req.params.id)
        const images = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
    
        return res.render("public/recipes/recipeDetail", {recipes, images}) 
    }
}