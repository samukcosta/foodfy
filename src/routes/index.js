const express = require('express')
const routes = express.Router()

const public = require('./public/public')
const admin = require('./admin/admin')

routes.get("/", function(req, res){
    return res.redirect("/foodfy")
})

routes.use('/foodfy', public)
routes.use('/admin', admin)

routes.get("/accounts", function(req, res){
    return res.redirect("/admin/login")
})

routes.use(function(req, res) {
    res.status(404).render("not-found")
})

module.exports = routes