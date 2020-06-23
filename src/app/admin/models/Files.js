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
    async delete(id){
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            fs.unlinkSync(file.path)

            return db.query(`DELETE FROM files WHERE id=$1`, [id])
        } catch(err) {
            console.log(err)
        }
    }
}