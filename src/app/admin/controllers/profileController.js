const User = require("../models/Users")
const Files = require("../models/Files")


module.exports = {
    async detail(req,res) {
        const {user} = req

        let results = await Files.findAvatarUser(user.pk_files_id)
        let avatar = results.rows[0]
        if (avatar != undefined) {
            avatar.src = `${req.protocol}://${req.headers.host}${avatar.path.replace("public", "")}`
        }

        return res.render('admin/users/index', {user, avatar})
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
    }
}