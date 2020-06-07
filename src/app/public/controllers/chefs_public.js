const ChefsPublic = require("../models/ChefsPublic")

module.exports = {
    index(req,res){
        ChefsPublic.index(function(chefs){
            return res.render("public/chefs", {chefs})
        })
    }
}