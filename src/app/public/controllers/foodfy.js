const fs = require("fs")
const RecipesPublic = require("../models/RecipesPublic")

module.exports = {
    async index(req,res){
        const {filter} = req.query
    
        let params = {}
        if (filter) params = {filter}
    
        let results = await RecipesPublic.index(params)
        const recipes = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('public/index', {recipes})
    },
    about(req,res){
        return res.render('public/about')
    }
}