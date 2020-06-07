const {date, lineBreak} = require("../../../lib/utils")
const db = require("../../../config/db")

module.exports = {
    index(callback){
        const query = `SELECT recipes.*, chefs.name AS chef 
        FROM recipes
        LEFT JOIN chefs ON (recipes.pk_chef_id = chefs.id)
        ORDER BY id ASC`

        db.query(query, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `INSERT INTO recipes (
            pk_chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        
        RETURNING id`

        const values = [
            data.id_chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            lineBreak(data.information).fbd,
            date(Date.now(data)).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    teacherSelectOptions(callback){
        db.query(`SELECT id, name FROM chefs
        ORDER BY name ASC`, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback){
        const query = `SELECT recipes.*, chefs.name AS chef 
        FROM recipes
        LEFT JOIN chefs ON (recipes.pk_chef_id = chefs.id)
        WHERE recipes.id = $1`

        db.query(query, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        query = `UPDATE recipes
        SET pk_chef_id = $1,
            image = $2,
            title = $3,
            ingredients = $4,
            preparation = $5,
            information = $6
        WHERE id = $7`

        values = [
            data.id_chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparations,
            lineBreak(data.information).fbd,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id=$1`, [id], function(err, results){
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}