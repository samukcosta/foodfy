const User = require('../models/Users')
const { compare } = require('bcryptjs')

function checkAllFields(body) {

    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor, preencha todos os campos'
            }
        }
    }
}

async function show(req, res, next){
    const {userID: id} = req.session

    const user = await User.findOne({where: {id} })

    if (!user) return res.render("admin/session/login", {
        error: "Usuário não encontrado"
    })

    req.user = user

    next()
}

async function post(req, res, next){

    const {email} = req.body

    const user = await User.findOne({where: {email}})

    if (user) return res.render("admin/users/create", {
        error: "E-mail já cadastrado."
    })

    next()
}

async function update(req, res, next){

    const {id, password} = req.body

    const user = await User.findOne({where: {id}})

    if (!password) return res.render("admin/users/index", {
        user,
        error: "Coloque sua senha para atualizar seu cadastro."
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render('admin/users/index', {
        user,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}

module.exports = {
    show,
    post,
    update
}