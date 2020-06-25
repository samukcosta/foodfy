const RecipesAdmin = require("../models/RecipesAdmin")
const Files = require("../models/Files")
const {lineBreak} = require("../../../lib/utils")
const ChefsAdmin = require("../models/ChefsAdmin")
const Recipe_Files = require("../models/Recipe_Files")

/*ADMIN*/

module.exports = {
    async index(req,res){
        let results = await Files.findMainImageAllRecipes()
        const recipes = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

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
            if (req.body[key] == "" && (key != "information") ) {
                return res.send("Please, fill all fields")
            }
        }

        if (req.files.length == 0){
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

        results = await Files.findAllImageRecipes(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        results = await ChefsAdmin.find(recipe.pk_chef_id)
        const chefs = results.rows

        return res.render("admin/recipes/recipeDetail", {recipe, files, chefs})

    },
    async edit(req,res){

        let results = await RecipesAdmin.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.render("Recipe not find")

        results = await RecipesAdmin.chefSelectOptions()
        chefs = results.rows

        recipe.information = lineBreak(recipe.information).fu

        results = await Files.findAllImageRecipes(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render(`admin/recipes/edit`, {recipe, chefs, files})
         
    },
    async put(req,res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files" && key != "information") {
                return res.send("Please, fill all fields")
            }
        }

        if(req.files.length != 0){
            const newFilesPromise = req.files.map(file => Files.create(
                {...file},
                req.body.id
            ))
            await Promise.all(newFilesPromise)
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedRecipe_FilesPromise = removedFiles.map(id => Recipe_Files.deleteFiles(id))
            const removedFilesPromise = removedFiles.map(id => Files.delete(id))

            await Promise.all(removedRecipe_FilesPromise, removedFilesPromise)
        }

        await RecipesAdmin.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)

    },
    async delete(req,res){
        let results = await Recipe_Files.findFilesToRemove(req.body.id)
        const files = results.rows

        const removedRecipe_FilesPromise = files.map(file => Recipe_Files.deleteFiles(file.file_id))
        const removedFilesPromise = files.map(file => Files.delete(file.file_id))
        const removedRecipePromise = await RecipesAdmin.delete(req.body.id)
        await Promise.all(removedRecipe_FilesPromise, removedFilesPromise, removedRecipePromise)

        

        return res.redirect("/admin/recipes")

        
    }
}