const db = require("../../../config/db")
const fs = require("fs")

module.exports = {
    create(file) {
        const query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `
        const values = [
            file.filename,
            file.path
        ]

        return db.query(query, values)
    },
    async delete(id){
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = results.rows[0]

            fs.unlinkSync(file.path)

            return db.query(`DELETE FROM files WHERE id=$1`, [id])
        } catch(err) {
            console.log(err)
        }
    }
}