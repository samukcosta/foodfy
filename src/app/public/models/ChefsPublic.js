const db = require("../../../config/db")

module.exports = {
    index(callback){
        const query = `
        SELECT chefs.*,
            (SELECT count(recipes.pk_chef_id) 
            FROM recipes 
            WHERE recipes.pk_chef_id = chefs.id) AS recipes_chef
        FROM chefs
        `

        db.query(query, function(err, results){
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })

    }
}