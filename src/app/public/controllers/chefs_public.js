const ChefsPublic = require("../models/ChefsPublic")

module.exports = {
    async index(req,res){
        let results = await ChefsPublic.index()
        const chefs = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("public/chefs", {chefs})
    }
}