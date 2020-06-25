const db = require("../../../config/db")

module.exports = {
    index(){
        const query = `
        SELECT chefs.id, chefs.name,
            (SELECT count(recipes.pk_chef_id) 
                FROM recipes 
                WHERE recipes.pk_chef_id = chefs.id) AS recipes_chef,
            (SELECT files.path FROM files WHERE files.id = chefs.pk_files_id) 
        FROM chefs
        `

        return db.query(query)

    }
}