const RecipesAdmin = require("../models/RecipesAdmin")
const Files = require("../models/Files")
const Recipe_Files = require("../models/Recipe_Files")
const {lineBreak} = require("../../../lib/utils")

/*ADMIN*/

module.exports = {
    async index(req,res){
        let results = await RecipesAdmin.index()
        const recipes = results.rows

        return res.render('admin/recipes/index', {recipes})

    },
    async create(req,res){
        let results = await RecipesAdmin.chefSelectOptions()
        const chefs = results.rows

        return res.render('admin/recipes/create', {chefs})

    },
    async post(req,res){

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && (!req.body[key].information) ) {
                return res.send("Please, fill all fields")
            }
        }

        if (req.files.lenght == 0){
            return res.send("Please, send at least one image")
        }

        let results = await RecipesAdmin.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => {
            Files.create(
                {...file},
                recipeId
                )
        })

        Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${recipeId}`)

    },
    async detail(req, res) {

        results = await RecipesAdmin.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send("Recipe not found!")

        recipe.information = lineBreak(recipe.information).fh

        const chefs = "" //COLOCAR O CHEFE AQUI

        return res.render("admin/recipes/recipeDetail", {recipe, chefs})

    },
    async edit(req,res){

        let results = await RecipesAdmin.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.render("Recipe not find")

        results = await RecipesAdmin.chefSelectOptions()
        chefs = results.rows

        recipe.information = lineBreak(recipe.information).fu

        return res.render(`admin/recipes/edit`, {recipe, chefs})
         
    },
    async put(req,res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Please, fill all fields")
            }
        }

        if(req.files.lenght != 0){
            const newFilesPromise = req.files.map(file => Files.create({
                ...file
            }))
            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.lenght - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => Files.delete(id))

            await Promise.all(removedFilesPromise)
        }

        return res.redirect(`/admin/recipes/${id}`)

    },
    async delete(req,res){
        RecipesAdmin.delete(req.body.id)

        return res.redirect("/admin/recipes")

        
    }
}