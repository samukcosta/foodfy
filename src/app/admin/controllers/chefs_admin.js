const User = require("../models/Users")
const Files = require("../models/Files")

module.exports = {
    async index(req, res){
        let results = await User.allChefs()

        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })
        
        const chefs = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/users/chefs", {chefs, user})
    },
    create(req, res){
        return res.render("admin/chefs/create")
    },
    async post(req,res){

        const keys = Object.keys(req.body)
    
        for (key of keys) {
            if (req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }

        if (req.files.length == 0) {
            return res.send("Please, send one image")
        }

        const filename = req.files[0].filename
        const path = req.files[0].path

        let results = await Files.createFileChef(filename, path)
        const idFile = results.rows[0].id

        await User.create(req.body, idFile)

        return res.redirect("/admin/chefs/")
    },
    async detail(req,res){

        let results = await User.find(req.params.id)
        const chef = results.rows[0]

        results = await Files.findMainImageRecipes(chef.id)
        let recipes

        if (results.rows[0].id != null) {
            recipes = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`}
                ))
        }

        if (!chef) return res.send("Chef not fount")
        
        const idAvatar = chef.pk_files_id
        results = await Files.findAvatarChef(idAvatar)
        let avatar = results.rows[0]
        avatar.src = `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`

        return res.render("admin/chefs/details", {chef, avatar, recipes})

    },
    async edit(req, res){

        let results = await User.find(req.params.id)
        const chef = results.rows[0]
        
        if (!chef) return res.render("Chef not find")
        
        const idAvatar = chef.pk_files_id
        results = await Files.findAvatarChef(idAvatar)
        let avatar = results.rows[0]
        avatar.src = `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`

        return res.render("admin/chefs/edit", {chef, avatar})

    },
    async put(req,res){

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Please, fill all fields")
            }
        }

        let idFile = 0

        if (req.files.length != 0) {
            const filename = req.files[0].filename
            const path = req.files[0].path
            let results = await Files.createFileChef(filename, path)
            idFile = results.rows[0].id  
        }

        await User.update(req.body, idFile)

        if (req.body.removed_files) {
            const idRemoved = req.body.removed_files
            await Files.delete(idRemoved)
        }


        return res.redirect(`/admin/chefs/${req.body.id}`)

    },
    async delete(req,res){

        let results = await User.find(req.body.id)
        const idFiles = results.rows[0].pk_files_id
        console.log(idFiles)

        User.delete(req.body.id)

        Files.delete(idFiles)

        return res.redirect("/admin/chefs")

    }
}