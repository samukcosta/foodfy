const db = require("../../../config/db")
const {date} = require("../../../lib/utils")
const { query } = require("../../../config/db")

module.exports = {
    all(){
        const query = `
            SELECT chefs.id, chefs.name, files.id AS id_files, files.name AS image, files.path 
            FROM chefs
            LEFT JOIN files ON (files.id = chefs.pk_files_id)
        `
        return db.query(query)
    },
    create(data, fileId){

        let query = `
            INSERT INTO chefs (
                name,
                created_at,
                pk_files_id
            ) VALUES ($1, $2, $3)

            RETURNING id
        `

        let values = [
            data.name,
            date(Date.now(data.name)).iso,
            fileId
        ]

        db.query(query, values)
    },
    find(id){

        let query = `SELECT c.*,  
        (SELECT count(r.pk_chef_id) FROM recipes r WHERE r.pk_chef_id = c.id) AS recipes_chef
        FROM chefs c
        WHERE c.id = $1
        GROUP BY c.id   
        `
        return db.query(query, [id])
    },
    findRecipesChef(id){
        return db.query(`SELECT id FROM recipes WHERE pk_chef_id = $1 ORDER BY id ASC`, [id])
    },
    update(data, fileId){

        let query = ""
        let values = ""

        if (fileId != 0) {
            query = `
                UPDATE chefs
                SET name = $1,
                    pk_files_id = $2
                WHERE id = $3
                `
            
            values = [
                data.name,
                fileId,
                data.id
            ]
        } else {
            query = `
                UPDATE chefs
                SET name = $1
                WHERE id = $2
                `
            
            values = [
                data.name,
                data.id
            ]
        }

        return db.query(query, values)
    },
    delete(id){
        db.query(`DELETE FROM chefs WHERE id=$1`, [id])
    }
}   