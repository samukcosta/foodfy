const db = require("../../../config/db")
const fs = require("fs")

module.exports = {
    create(recipeId, fileId) {
        const query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
            RETURNING id
        `
        const values = [
            recipeId,
            fileId
        ]

        return db.query(query, values)
    },
    findFilesToRemove(id){
        return db.query(`SELECT file_id FROM recipe_files WHERE recipe_id = $1`, [id])
    },
    deleteFiles(id) {
        return db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id])
    }
}