const db = require("../../../config/db")
const {date} = require("../../../lib/utils")

module.exports = {
    all(callback){
        db.query("SELECT * FROM chefs ORDER BY id ASC", function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){

        let query = `
            INSERT INTO chefs (
                avatar_url,
                name,
                created_at
            ) VALUES ($1, $2, $3)

            RETURNING id
        `

        let values = [
            data.avatar_url,
            data.name,
            date(Date.now(data.name)).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    listRecipesChef(id, callback){
        const query = `SELECT recipes.id, recipes.image, recipes.title 
        FROM recipes
        WHERE pk_chef_id = $1
        ORDER BY id ASC `

        db.query(query, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    find(id, callback){

        let query = `SELECT c.*,  
        (SELECT count(r.pk_chef_id) FROM recipes r WHERE r.pk_chef_id = c.id) AS recipes_chef
        FROM chefs c
        WHERE c.id = $1
        GROUP BY c.id
        `
        db.query(query, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE chefs
        SET avatar_url = $1,
            name = $2
        WHERE id = $3
        `

        const values = [
            data.avatar_url,
            data.name,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id=$1`, [id], function(err, results){
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
}   