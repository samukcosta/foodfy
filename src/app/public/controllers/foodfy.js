const fs = require("fs")
const RecipesPublic = require("../models/RecipesPublic")

exports.index = function(req,res){
    const {filter} = req.query

    let params = {}
    if (filter) params = {filter}

    RecipesPublic.index(params, function(recipes){
        return res.render('public/index', {recipes})
    })
}
exports.about = function(req,res){
    return res.render('public/about')
}