const db = require("../../../config/db")
const Recipe_Files = require("../models/Recipe_Files")

const fs = require("fs")

module.exports = {
    async create({filename, path}, recipeId) {
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)

            RETURNING id
        `
        const values = [
            filename,
            path
        ]

        const files = await db.query(query, values)

        Recipe_Files.create(recipeId, files.rows[0].id)
        
        return files.rows
    },
    async createFileChef(filename, path){
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)

            RETURNING id
        `
        const values = [
            filename,
            path
        ]

        return await db.query(query, values)
    },
    findAvatarChef(id){
        return db.query(`SELECT * FROM files WHERE id = $1`, [id])
    },
    async findMainImageAllRecipes(){
        return await db.query(`SELECT 
        DISTINCT ON (recipes.id) recipes.id, recipes.title, 
        chefs.name,
        files.id AS id_files, files.name AS name_files, files.path FROM recipes
        LEFT JOIN chefs ON (recipes.pk_chef_id = chefs.id)
        LEFT JOIN recipe_files ON (recipe_files.recipe_id = recipes.id )
        LEFT JOIN files ON (files.id = recipe_files.file_id )
        ORDER BY recipes.id ASC`)
    },
    findMainImageRecipes(id){
        return db.query(`SELECT 
        DISTINCT ON (recipes.id) recipes.id, recipes.title, 
        files.id AS id_files, files.name AS name_files, files.path FROM chefs
        LEFT JOIN recipes ON (recipes.pk_chef_id = chefs.id)
        LEFT JOIN recipe_files ON (recipe_files.recipe_id = recipes.id )
        LEFT JOIN files ON (files.id = recipe_files.file_id )
        WHERE chefs.id = $1 ORDER BY recipes.id ASC`, [id])
    },
    async findAllImageRecipes(id){
        const query = `SELECT 
        recipes.id AS id_recipes, recipes.title, 
        files.id AS id_files, files.name AS name_files, files.path FROM chefs
        LEFT JOIN recipes ON (recipes.pk_chef_id = chefs.id)
        LEFT JOIN recipe_files ON (recipe_files.recipe_id = recipes.id )
        LEFT JOIN files ON (files.id = recipe_files.file_id )
        WHERE recipes.id = $1 ORDER BY recipes.id ASC`

        return await db.query(query, [id])
    },
    async delete(id){
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            fs.unlinkSync(file.path)

        } catch(err) {
            console.log(err)
        }
        return db.query(`DELETE FROM files WHERE id=$1`, [id])

    }
}