const User = require("../models/Users")
const Files = require("../models/Files")


module.exports = {
    async create(req, res) {

        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })
        
        return res.render("admin/users/create", {user})
    },
    async post(req, res) {
        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })

        let isAdmin = false
        let isChef = false

        if (req.body.admin) {
            isAdmin = true
        }

        if (req.body.chef) {
            isChef = true
        }

        let results = await User.create(req.body, isAdmin, isChef)

        if (!results) {
            return res.render('admin/users/create', {
                user: req.body,
                error: "Erro ao cadastrar! Tente novamente"
            })
        }

        return res.render('admin/users/create', {
            user,
            success: "Usuário cadastrado!"
        })
    },
    async detail(req,res) {
        const {user} = req

        let results = await Files.findAvatarUser(user.pk_files_id)
        let avatar = results.rows[0]
        if (avatar != undefined) {
            avatar.src = `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }

        return res.render('admin/users/index', {user, avatar})
    },
    async showUser(req,res){
        let {userID: id} = req.session
        const user = await User.findOne({where: {id} })

        id = req.params.id

        const profile = await User.findOne({where: {id} })

        let results = await Files.findAvatarUser(profile.pk_files_id)
        let avatar = results.rows[0]
        if (avatar != undefined) {
            avatar.src = `${req.protocol}://${req.headers.host}${avatar.path.replace('public', "")}`
        }

        return res.render('admin/users/edit', {user, profile, avatar})

    },
    async showAllUsers(req, res){
        let results = await User.allUsers()

        const {userID: id} = req.session
        const user = await User.findOne({where: {id} })
        
        const profiles = results.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render('admin/users/profiles', {profiles, user})

    },
    async update(req, res){
        try {
            const {user} = req

            let {name, email} = req.body

            let pk_files_id = 0

            if (req.files.length != 0) {
                const filename = req.files[0].filename
                const path = req.files[0].path
                let results = await Files.createFileUser(filename, path)
                pk_files_id = results.rows[0].id  
            }

            await User.update(user.id, {name, email, pk_files_id})

            if (req.body.removed_files) {
                const idRemoved = req.body.removed_files
                await Files.delete(idRemoved)
            }

            return res.render("admin/users/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })
        } catch (erro) {
            console.error(err)
            return res.render("admin/users/index", {
                error: "Houve algum error. Por favor, tente novamente."
            })
        }
    },
    async updateUser(req, res){
        try {

            let is_admin = false
            let is_chef = false

            if (req.body.admin) {
                is_admin = true
            }

            if (req.body.chef) {
                is_chef = true
            }

            let {id, name, email} = req.body

            await User.update(id, {name, email, is_admin, is_chef})

            return res.redirect("/admin/users/profiles")
        } catch (err) {
            console.error(err)
            return res.render("admin/users/profiles", {
                error: "Houve algum error. Por favor, tente novamente."
            })
        }
    },
    async deleteUser(req, res){
        try {
            let {id} = req.body

            await User.delete(id)

            return res.redirect("/admin/users/profiles")
        } catch (err) {
            console.error(err)
            return res.render("admin/users/profiles", {
                error: "Houve algum error. Por favor, tente novamente."
            })
        }
    }
}