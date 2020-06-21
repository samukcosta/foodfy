const {date, lineBreak} = require("../../../lib/utils")
const db = require("../../../config/db")

module.exports = {
    index(){
        const query = `SELECT recipes.*, chefs.name AS chef 
        FROM recipes
        LEFT JOIN chefs ON (recipes.pk_chef_id = chefs.id)
        ORDER BY id ASC`

        return db.query(query)
    },
    create(data){
        const query = `INSERT INTO recipes (
            pk_chef_id,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6)
        
        RETURNING id`

        const values = [
            data.id_chef,
            data.title,
            data.ingredients,
            data.preparations,
            lineBreak(data.information).fbd,
            date(Date.now(data)).iso
        ]

        return db.query(query, values)
    },
    chefSelectOptions(){
        return db.query(`SELECT id, name FROM chefs
        ORDER BY name ASC`)
    },
    find(id){
        const query = `SELECT recipes.*, chefs.name AS chef 
        FROM recipes
        LEFT JOIN chefs ON (recipes.pk_chef_id = chefs.id)
        WHERE recipes.id = $1`

        return db.query(query, [id])
    },
    update(data){
        query = `UPDATE recipes
        SET pk_chef_id = $1,
            title = $2,
            ingredients = $3,
            preparation = $4,
            information = $5
        WHERE id = $6`

        values = [
            data.id_chef,
            data.title,
            data.ingredients,
            data.preparations,
            lineBreak(data.information).fbd,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM recipes WHERE id=$1`, [id])
    }
}