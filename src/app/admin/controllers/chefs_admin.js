const ChefsAdmin = require("../models/ChefsAdmin")

module.exports = {
    index(req, res){
        ChefsAdmin.all(function(chefs){
            return res.render("admin/chefs/index", {chefs})
        })
    },
    create(req, res){
        return res.render("admin/chefs/create")
    },
    post(req,res){

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }

        ChefsAdmin.create(req.body, function(){
            return res.redirect("/admin/chefs/")
        })
    },
    detail(req,res){
        const {id} = req.params

        ChefsAdmin.find(id, function(chef){
            ChefsAdmin.listRecipesChef(id, function(recipes){
                return res.render("admin/chefs/details", {chef, recipes})
            })
        })
    },
    edit(req, res){

        const {id} = req.params

        ChefsAdmin.find(id, function(chef){
            return res.render("admin/chefs/edit", {chef})
        })
        
    },
    put(req,res){
        const {id} = req.body

        ChefsAdmin.update(req.body, function(){
            return res.redirect(`/admin/chefs/${id}`)
        })
    },
    delete(req,res){
        const {id} = req.body

        ChefsAdmin.delete(id, function(){
            return res.redirect("/admin/chefs")
        })
    }
}