const Chefs = require("../../admin/models/Users")

module.exports = {
    async index(req,res){
        let results = await Chefs.allChefs()
        const chefs = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("public/chefs", {chefs})
    }
}