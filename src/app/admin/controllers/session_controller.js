const {hash} = require('bcryptjs')
const crypto = require("crypto")
const mailer = require('../../../lib/mailer')

const User = require("../models/Users")

module.exports = {
    loginForm(req, res) {
        return res.render("session/login", {})
    },
    login(req, res) {
        req.session.userID = req.user.id

        return res.redirect("/admin")
    },
    logout(req,res){
        req.session.destroy()

        return res.redirect("/foodfy")
    },
    forgotForm(req, res){
        return res.render("session/forgot-password")
    },
    async forgot(req, res){
        const user = req.user

        try {
            const token = crypto.randomBytes(20).toString("hex")

            let now = new Date()
            now = now.setHours(now.getHours() + 1)
    
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
    
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Reset de Senha - Foodfy',
                html: `<h2>Você solicitou o reset de senha!</h2>
                <p>Clique no link abaixo para criar a nova senha.</p>
                <p><a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blanck">
                    CRIAR SENHA </a>
                </p>
                `,
            })
    
            return res.render("session/forgot-password", {
                user,
                success: "Email enviado! Verifique seu email para resetar sua senha."
            })

        } catch (err) {
            console.error(err)
            return res.render("session/forgot-password", {
                error: "Error inesperado. Tente novamente."
            })
        }
    },
    resetForm(req, res){
        return res.render("session/password-reset", {
            token: req.query.token
        })
    },
    async reset(req, res) {
        const user = req.user
        const {password, token} = req.body

        try {
            const newPassword = await hash(password, 8)

            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: "",
            })

            return res.render("session/login", {
                user: req.body,
                success: "Senha atualizada! Faça o seu login"
            })

        } catch (err) {
            console.log(err)
            return res.render("session/password-reset", {
                user: user,
                token,
                error:"Erro inesperado, tente novamente!"
            })
        }
    }
}