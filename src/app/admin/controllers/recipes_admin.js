const RecipesAdmin = require("../models/RecipesAdmin")
const Files = require("../models/Files")
const {lineBreak} = require("../../../lib/utils")
const User = require("../models/Users")
const Recipe_Files = require("../models/Recipe_Files")

/*ADMIN*/

module.exports = {
    async index(req,res){
        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })
        let results
        let recipes

        if (user.is_admin == true) {
            results = await Files.findMainImageAllRecipes()
            if (results.rows[0].id != null) {
                recipes = results.rows.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                }))
            }
            
        } else {
            results = await Files.findMainImageRecipes(user.id)
            if (results.rows[0].id != null) {
                recipes = results.rows.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                }))
            }
        }

        return res.render('admin/recipes/index', {recipes, user})

    },
    async create(req,res){
        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })
        let chefs

        if (user.is_admin == true){
            let results = await RecipesAdmin.chefSelectOptions()
            chefs = results.rows
        }
        
        return res.render('admin/recipes/create', {chefs, user})

    },
    async post(req,res){

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && (key != "information") ) {
                return res.render("Please, fill all fields")
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

        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })

        let results, recipe, files

        results = await RecipesAdmin.find(req.params.id)
        recipe = results.rows[0]

        if (!recipe) return res.send("Recipe not found!")

        if (user.is_admin == true) {
            recipe.information = lineBreak(recipe.information).fh

            results = await Files.findAllImageRecipes(recipe.id)
            files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
        } else {
            if (user.id == recipe.pk_user_id) {
                recipe.information = lineBreak(recipe.information).fh

                results = await Files.findAllImageRecipes(recipe.id)
                files = results.rows.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                }))
            } else {
                return res.render('admin/users/index', {
                    user,
                    error: 'Esta receita não é sua. Você não tem permissão para olhar.',
                })
            }
        }

        return res.render("admin/recipes/recipeDetail", {recipe, files, user})

    },
    async edit(req,res){

        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })

        let chefs, files

        let results = await RecipesAdmin.find(req.params.id)
        let recipe = results.rows[0]

        if (user.is_admin == true){

            if(!recipe) return res.render("Recipe not find")
    
            results = await RecipesAdmin.chefSelectOptions()
            chefs = results.rows
    
            recipe.information = lineBreak(recipe.information).fu
    
            results = await Files.findAllImageRecipes(recipe.id)
            files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
        } else {

            if (user.id == recipe.pk_user_id) {
                if(!recipe) return res.render("Recipe not find")
        
                recipe.information = lineBreak(recipe.information).fu
        
                results = await Files.findAllImageRecipes(recipe.id)
                files = results.rows.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
                }))
            }
        }

        

        return res.render(`admin/recipes/edit`, {recipe, chefs, files, user})
         
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