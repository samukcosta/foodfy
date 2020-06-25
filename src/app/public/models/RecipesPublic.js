const db = require("../../../config/db")

module.exports = {
    index(params){
        let filterRecipes = ``

        if (params.filter) {
            filterRecipes = `
            WHERE recipes.title ILIKE '%${params.filter}%'
            `
        }

        const query = `
        SELECT DISTINCT ON (recipes.id) recipes.id AS id_recipe, recipes.title,
            chefs.id AS id_chef, chefs.name AS chef_name,
            files.id AS id_file, files.name AS file_name, files.path FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.pk_chef_id)
            LEFT JOIN recipe_files ON (recipe_files.recipe_id = recipes.id)
            LEFT JOIN files ON (files.id = recipe_files.file_id)
            ${filterRecipes}
            ORDER BY recipes.id ASC 
        `

        return db.query(query)
    },
    find(id){
        const query = `SELECT recipes.*, chefs.name
        FROM recipes
        INNER JOIN chefs ON (chefs.id = recipes.pk_chef_id)
        WHERE recipes.id = $1`

        return db.query(query, [id])

    },
    imagesRecipe(id_recipe) {
        const query = `SELECT files.* FROM recipe_files
            LEFT JOIN recipes ON (recipe_files.recipe_id = recipes.id )
            LEFT JOIN files ON (files.id = recipe_files.file_id )
            WHERE recipes.id = $1`

        return db.query(query, [id_recipe])
    }
}